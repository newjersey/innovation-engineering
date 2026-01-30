---
title: Running a Node project on Windows
wip: true
---

E.g., you might have agency partners working on Windows machines, and want to have them run a node project without [going through WSL2](https://newjersey.github.io/innovation-engineering/guides/laptop-setup-windows/), which requires admin access that agency partners may not have. See [this Microsoft guide](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows) for considerations about whether to use WSL2, or bare windows.

## Node on bare Windows

Overall, [the Microsoft guide](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm) is what we want to follow for setting up the node project on bare Windows


## ZScaler things

If you have Zscaler on your machine, you might encounter errors about SSL certificates. The problem is that OIT's network security tool (Zscaler) intercepts and decrypts all HTTPS traffic to scan it for security threats. While this keeps the network secure, it means that development tools like `npm`, `pip`, AWS CLI tools, and Azure CLI tools don't trust the connection because they don't recognize Zscaler's certificate.

**The solution**: We need to tell your Windows environment to trust the Zscaler root certificate.

### Installing the Zscaler Certificate

1. **Get the certificate file**: Download the [ZScaler CA certificate](https://njcio.slack.com/files/U06GURJCTSR/F06KBFR5PC7/node_awscli_zscaler_ca.crt) from Slack to your Downloads folder on Windows.

2. **Install the certificate**:

   - Open the **Run** dialog by pressing `Win + R`.
   - Type `mmc` and press `Enter` to open the Microsoft Management Console.
   - Go to **File** > **Add/Remove Snap-in**.
   - Select **Certificates** and click **Add**.
   - Choose **Computer account**, and then click **Next**. Select **Local computer** and click **Finish**.
   - Click **OK** to return to the main MMC window.
   - In the left pane, expand **Certificates (Local Computer)**, then expand **Trusted Root Certification Authorities**.
   - Right-click on **Certificates**, select **All Tasks** > **Import**.
   - In the Certificate Import Wizard, click **Next**.
   - Browse to your Downloads folder and select the `node_awscli_zscaler_ca.crt` file.
   - Complete the wizard by clicking **Next** and then **Finish**.

### Installing the Zscaler Certificate on Windows

1. **Get the certificate file**: Download the [ZScaler CA certificate](https://njcio.slack.com/files/U06GURJCTSR/F06KBFR5PC7/node_awscli_zscaler_ca.crt) from Slack to your Downloads folder on Windows.

2. **Install the certificate**:

   - Open the **Run** dialog by pressing `Win + R`.
   - Type `mmc` and press `Enter` to open the Microsoft Management Console.
   - Go to **File** > **Add/Remove Snap-in**.
   - Select **Certificates** and click **Add**.
   - Choose **Computer account**, and then click **Next**. Select **Local computer** and click **Finish**.
   - Click **OK** to return to the main MMC window.
   - In the left pane, expand **Certificates (Local Computer)**, then expand **Trusted Root Certification Authorities**.
   - Right-click on **Certificates**, select **All Tasks** > **Import**.
   - In the Certificate Import Wizard, click **Next**.
   - Browse to your Downloads folder and select the `node_awscli_zscaler_ca.crt` file.
   - Complete the wizard by clicking **Next** and then **Finish**.

3. **Verify the installation**:

   - The certificate should now be listed under **Trusted Root Certification Authorities** > **Certificates**.

### Configuring Node.js for Zscaler

Follow [the Microsoft guide](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm) to install nvm and node. Then, install yarn (Sorry, how to do so without npm is a little unclear. This was done via a downloadable installer for an old version of yarn https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable. However, https://yarnpkg.com/corepack with corepark is probably the right way to do it - just not sure if that itself runs into SSL issues).

1. **Set Environment Variables**:
5
   Open PowerShell as Administrator and run the following commands, replacing `C:\path\to\your\ca-certificates.crt` with the actual path to your certificate file:

   ```powershell
   [System.Environment]::SetEnvironmentVariable('NODE_TLS_REJECT_UNAUTHORIZED', '0', [System.EnvironmentVariableTarget]::Machine)
   [System.Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'C:\Users\onmlee3\OneDrive - New Jersey Office of Information Technology\Documents\node_awscli_zscaler_ca.crt', [System.EnvironmentVariableTarget]::Machine)
   [System.Environment]::SetEnvironmentVariable('NODE_OPTIONS', '--use-openssl-ca', [System.EnvironmentVariableTarget]::Machine)
   ```

2. **Disable strict SSL in Yarn**:

   ```powershell
   corepack enable
   yarn config set enableStrictSsl false -H
   ```

### Test Node.js

To verify that Node.js is configured correctly:

1. Open a new PowerShell window.
2. Run the following command to test an HTTPS connection:

   ```powershell
   node -e "require('https').get('https://ipinfo.io/ip', res => res.on('data', d => process.stdout.write(d)))"
   ```

If everything is set up correctly, you should see your public IP address output in the console.
