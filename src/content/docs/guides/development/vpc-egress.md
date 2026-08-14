---
title: Enable internet egress from a resource inside a VPC
description: How to request outbound internet access for a VPC-attached Lambda through the Tech Ops and EPC process.
---

Lambdas (and other AWS resources) attached to a VPC lose direct internet access by default. This affects any resource that needs to call an external API or third-party service. Outbound internet traffic must instead flow through a centralized egress path managed by the OIT EPC team, reached via the existing Transit Gateway.

If your resource is inside a VPC and making outbound calls that fail with `ECONNRESET`, or invocations that time out at exactly your configured timeout with no other error, blocked egress is likely the cause. To resolve it, you submit a Tech Ops ticket with your network details and EPC configures the egress policy on their end.

This guide covers the process for external internet access. If you need to enable egress from the VPC into the GSN or other state systems, it will be a similar process with likely more involeved back-and-forth with Tech Ops and EPC.

## Before you begin

Confirm that your Lambda's local networking is correctly configured before submitting a ticket. EPC manages the routing downstream of the Transit Gateway — if your local config is wrong, the request will stall.

Verify all of the following in your application account. Tech Ops can help if needed.

- The Lambda is attached to **private subnets** (not public).
- Each private subnet's route table sends `0.0.0.0/0` to the **Transit Gateway**
- The Lambda's **security groups** permit outbound traffic on the required port (typically TCP/443).
- The subnet's **network ACL** permits outbound traffic.
- **VPC DNS resolution** is enabled on the VPC.
- There is **no NAT gateway or internet gateway** in the account — traffic must flow via Transit Gateway.

## Step 1: Gather your network information

Collect the following before opening a ticket. You need this for every environment (dev, prod) that requires egress.

**Per environment:**

| Field | Where to find it |
|---|---|
| AWS account name | AWS console top-right dropdown |
| AWS account ID | AWS console → account settings, or `aws sts get-caller-identity` |
| VPC ID | VPC console → Your VPCs |
| VPC CIDR block | VPC console → Your VPCs |
| Transit Gateway ID | VPC console → Transit Gateways, or the subnet route table entry for `0.0.0.0/0` |

Or run the following, substituting your Lambda function name and AWS profile:

```sh
FUNCTION_NAME=your-function-name
PROFILE=your-aws-profile

# Log in first if needed
aws sso login --profile $PROFILE

ACCOUNT_ID=$(aws --profile $PROFILE sts get-caller-identity --query 'Account' --output text)

VPC_ID=$(aws --profile $PROFILE lambda get-function-configuration \
  --function-name "$FUNCTION_NAME" \
  --query 'VpcConfig.VpcId' --output text)
VPC_CIDR=$(aws --profile $PROFILE ec2 describe-vpcs --vpc-ids "$VPC_ID" \
  --query 'Vpcs[0].CidrBlock' --output text)

SUBNET_ID=$(aws --profile $PROFILE lambda get-function-configuration \
  --function-name "$FUNCTION_NAME" \
  --query 'VpcConfig.SubnetIds[0]' --output text)
TGW_ID=$(aws --profile $PROFILE ec2 describe-route-tables \
  --filters "Name=association.subnet-id,Values=$SUBNET_ID" \
  --query 'RouteTables[0].Routes[?DestinationCidrBlock==`0.0.0.0/0`].TransitGatewayId | [0]' \
  --output text)

echo "Account ID:   $ACCOUNT_ID"
echo "VPC ID:       $VPC_ID"
echo "VPC CIDR:     $VPC_CIDR"
echo "TGW ID:       $TGW_ID"
```

## Step 2: Submit a Tech Ops ticket

Open a ticket with Tech Ops and include:

- **What you need:** outbound HTTPS (TCP/443) from your VPC through EPC's centralized egress path via Transit Gateway.
- **Source details** for each environment: account name, account ID, VPC ID, VPC CIDR.
- **Confirmation** that you have verified the local configuration checklist above.
- **Whether you need prod configured now** or whether that can follow separately — if you want prod pre-approved ahead of deployment, say so. EPC may require a separate ServiceNow request per environment.

Tech Ops will coordinate with EPC to review and configure the egress policy.

## Step 3: Confirm egress is working

Once Tech Ops confirms the request is complete, invoke your Lambda and check:

- The external API call succeeds (no `ECONNRESET`, no timeout at the Lambda boundary).
- CloudWatch logs show a normal response, not a connection error.

If the call still fails after EPC confirms, check whether the issue is now a destination-side error (e.g., auth failure, DNS resolution) rather than a network block. A `ETIMEDOUT` or `ECONNRESET` after the policy change suggests the FQDN list may be incomplete or the wrong Transit Gateway was referenced in the ticket.
