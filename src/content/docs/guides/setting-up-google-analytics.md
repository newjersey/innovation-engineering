---
title: Setting up Google Analytics
description: How to setup Google Analytics Tracking on your Website
---

## The Basics

For testing, make sure any adblock is turned off.

1. Set up the Google Analytics 4 ID
    - **Ideal**: Use your agency partner’s Google Analytics account
        - Ask your agency IT partners whether they have a Google Analytics account, and their preference on using an existing property vs. setting up a new one
        - See if you/your team can gain access to their Google Analytics account so you can view metrics
    - **Secondary Option**: If for any reason you won’t be able to access a GA4 ID set up through your agency in time, you can set one up via OOI’s property.
        - Create an [Operations Request ticket](https://github.com/newjersey/internal-ops/issues/new?assignees=&labels=general%2Crequest&projects=newjersey%2F16&template=request_general.yaml&title=%5BGeneral%5D%3A+Create+GA4+ID+for+PROJECT)
        - Make sure to indicate who will need access to the GA4 property. Typically this is the PM and engineers on the team to troubleshoot & debug the analytics set-up. For viewing analytics on an ongoing basis, we typically will set up a Looker dashboard. [View Example](https://github.com/newjersey/internal-ops/issues/349)
2. Get access to the OIT Google Tag Manager Container
    - If you or your teammates don’t yet have access to OIT’s GTM container, email [OIT web publishing](https://docs.google.com/document/d/1MNDEx6Oabu5CxrgqMnhFpO9XDX-LTYjNNTw6qGNwqKM/edit?tab=t.0#heading=h.k89ioaydzbt3) requesting access to the shared NJ GTM instance.
        - Only the people that will be actively updating GTM will need access here. Ideally, the PM and at least one engineer on the team has access.
3. Create a new workspace for your changes (if one is available; if not, use the default workspace)
    - Once you are provisioned access, you can go to [Tag manager](https://tagmanager.google.com/) to manage GTM.
    - [Creating workspaces](https://support.google.com/tagmanager/answer/7059647?hl=en)	
4. Add the GTM container code to your website (requires engineering support)
    - To access the code, visit tagmanager.google.com, under the “State of New Jersey” account, click on the `www.nj.gov` container, select your workspace, and finally, in the top right of the menu bar, click on the link reading `GTM-P3V3PJ6`. This will open up a modal with instructions on code to add.
    - See the index.html of the AI Assistant for an example.
5.  [Add the Google Tag via GTM](https://support.google.com/tagmanager/answer/9442095?hl=en) (You’ll need the GA4 ID to set this up correctly)
6. Confirm via the “Preview” that the [GA4 ID is being fired correctly](https://support.google.com/tagmanager/answer/6107056?hl=en). You can also check this in the [“Realtime” analytics](https://analytics.google.com).
7. **Optional**: Manage your event tagging
    - Many things will already be automatically captured, such as [users, sessions, and views](https://support.google.com/analytics/answer/9234069?hl=en)
    - [If you require custom events, follow these instructions](https://support.google.com/analytics/answer/12229021?hl=en)
        - General steps:
            - Align on event definition and parameters as a team. Note: Documenting the custom event names and parameters in a spreadsheet can help the team stay aligned on what events are being tracked and implemented from code to GTM. For an example, see the AI Assistant tracker, particularly columns G and H.
            - Engineering to implement the events within the application’s JavaScript code
            - Then, PM or Engineering can configure the tag and triggers within GTM
8. Once the GA ID and any desired custom event tracking is added, email [OIT web publishing](https://docs.google.com/document/d/1MNDEx6Oabu5CxrgqMnhFpO9XDX-LTYjNNTw6qGNwqKM/edit?tab=t.0#heading=h.k89ioaydzbt3) to publish the tag. This step is important; without this, you will not capture analytics. 
    - They typically have a quick turnaround, within a few hours to a day, but make sure to build in some time here ahead of launch.
9. It will take 24-48 hours for analytics reports to start populating, but to confirm the tags once they are live, you can use the “Realtime” reporting within Google Analytics. 
10. For custom dashboards, Looker Studio dashboards can be set up (by Engineering) after Google Analytics is implemented and added (note that it takes 24-48 hours to start seeing new events in Looker). In the meantime, you can see analytics reporting within Google Analytics itself. For an example, see the AI Assistant Looker Studio dashboard

## Best Practices

- Test any changes using the “Preview” functionality
- Use “Folders” to organize your tags, variables, and triggers
- Use a standard naming convention for tags, variables, and triggers to make them easy to search
