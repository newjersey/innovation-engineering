---
title: Setting up Google Analytics
description: How to setup Google Analytics Tracking on your Website
---

## The basics

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
5. [Add the Google Tag via GTM](https://support.google.com/tagmanager/answer/9442095?hl=en) (You’ll need the GA4 ID to set this up correctly)
6. Confirm via the “Preview” that the [GA4 ID is being fired correctly](https://support.google.com/tagmanager/answer/6107056?hl=en). You can also check this in the [“Realtime” analytics](https://analytics.google.com).
7. **Optional**: Manage your event tagging
    - Many things will already be automatically captured, such as [users, sessions, and views](https://support.google.com/analytics/answer/9234069?hl=en)
    - [If you require custom events, follow the instructions below](#setting-up-custom-google-analytics-events)
8. Once the GA ID and any desired custom event tracking is added, email [OIT web publishing](https://docs.google.com/document/d/1MNDEx6Oabu5CxrgqMnhFpO9XDX-LTYjNNTw6qGNwqKM/edit?tab=t.0#heading=h.k89ioaydzbt3) to publish the tag. This step is important; without this, you will not capture analytics.
    - They typically have a quick turnaround, within a few hours to a day, but make sure to build in some time here ahead of launch.
9. It will take 24-48 hours for analytics reports to start populating, but to confirm the tags once they are live, you can use the “Realtime” reporting within Google Analytics.
10. For custom dashboards, Looker Studio dashboards can be set up (by Engineering) after Google Analytics is implemented and added (note that it takes 24-48 hours to start seeing new events in Looker). In the meantime, you can see analytics reporting within Google Analytics itself. For an example, see the AI Assistant Looker Studio dashboard

## Setting up custom Google Analytics events

Here are detailed instructions on how to set
up [a custom event](https://support.google.com/analytics/answer/12229021?hl=en).

### Step 1 - log event in app

The specifics depends on the app, but basically you will log events w/ an event name & (optionally) some associated
parameters. For example, you might log the event `downloaded_file` with the parameter `{ object_size: 4096 }`.

#### Tips for event definition

**Align on event definition and parameters as a team.** Documenting the custom event names and parameters in a
spreadsheet can help the team stay aligned on what events are being tracked and implemented from code to GTM. For an
example, see the AI Assistant tracker, particularly columns G and H.

**Try to keep event parameter names generic** (e.g. `object_count`
instead of `file_count`). That way, they can be reused across multiple custom events (since GA4 has a limit of 50
event-scoped custom dimensions).

**Do not create unnecessary [high-cardinality custom dimensions](https://support.google.com/analytics/answer/12226705)**
(more than 500 unique values in one day). For example, a parameter recording unique user IDs, session IDs, timestamps,
etc. You can
find [more info on custom dimensions here](https://support.google.com/analytics/answer/14240153?hl=en).

### Step 2 - configure event in GTM container

**Create a new workspace**

1. Go to [the NJIA GTM container](https://tagmanager.google.com/).
2. Create a new Workspace to make your changes in.
   1. This helps OIT to publish just our changes when the time comes. If all 3 workspaces are taken you can make changes
      in the Default Workspace.

**Create a new Variable (if necessary)**

1. In the "Variables" tab in the sidebar, check whether the event parameter(s) you're using already exist.
2. If the parameter doesn't exist, create a new variable:
   - Title the variable (e.g. "Object count").
      - Click the folder icon next to the title and select your project's folder.
   - **Variable type:** "Data Layer Variable"
   - **Data Layer Variable Name:** the property name of the event parameter (e.g. "object_count")
   - **Data Layer Version:** "Version 2"
   - Configure other options as needed

**Create a new trigger**

1. Go to the "Triggers" pane in the sidebar > click the "New" button
2. Title: "[project] - [name]"
   - Click the folder icon next to the title and select your project's folder.
3. Click "Trigger Configuration" and select "Custom Event" as the trigger type
4. **Event name:** The name of your new event
5. Leave the "All Custom Events" radio button selected.

**Create a new tag**

1. Go to the "Tags" pane in the sidebar > click the "New" button.
2. Title: "[project] - [name]"
   - We recommend using the same title as the trigger you just created.
   - Click the folder icon next to the title and select your project's folder.
3. "Tag Configuration" section
   1. Select "Google Analytics" > "Google Analytics: GA4 Event" for the tag type.
   2. **Measurement ID:** The measurement ID of your Google Analytics property (see other custom events for examples).
   3. **Event Name:** the name of your new event (e.g. upload_files_error_file_count)
   4. Under the "Event Parameters" section, click the "Add parameter" button

   - **Event Parameter:** the property name of the parameter (e.g. object_count)
   - **Value:** click the add variable icon (lego button with a plus sign) and select the variable you created in the
     previous step.
4. Click the "Triggering" section and select the trigger you created in the previous step.

### Step 3 - test new event

1. Run your app locally.
2. In the GTM container, click the "Preview" button in the toolbar. This will open the Tag Assistant.
3. Enter the local dev URL as the website URL
4. In the new window of the app that opens, test the interaction that should fire the custom event.
   - You should see the event fire on the Tag Assistant page. Also check that the event parameter(s) come through as
     expected in the "variables" tab.
   - Check that the GA4 event successfully fires under "Tags" of the GTM container. Also click into the card in order to
     confirm that the event has been sent to the correct GA tag with the expected event parameters.

### Step 4 - add custom dimensions to GA4 (if necessary)

If you created a new event parameter, then we need to add a custom dimension for each new event parameter to the GA
property in order for it to show in the dashboard.

1. From the GA property dashboard, go to the Admin section (the gear icon at the bottom of the sidebar).
2. Under the "Data display" settings section, click "Custom definitions"
3. For each new event parameter, click "Create custom dimension"
   - **Dimension name:** use the same name as the GTM Variable (e.g. "Object Count")
   - **Scope:** "Event"
   - **Event parameter:** the property in extraParameters (e.g. "object_count")
4. If you use the Tag Assistant to preview the changes to GTM again, you should now see your events appear in the GA
   dashboard as well.

### Step 5 - request to publish the GTM changes

Send an email to [OIT web publish](https://docs.google.com/document/d/1MNDEx6Oabu5CxrgqMnhFpO9XDX-LTYjNNTw6qGNwqKM/edit?tab=t.0#heading=h.k89ioaydzbt3) requesting for your changes to the GTM container to be published.

Make sure to:

- CC operations@[OIT domain] for visibility
- Include the name of the Workspace containing the changes to be published

## Best practices

- Test any changes using the “Preview” functionality
- Use “Folders” to organize your tags, variables, and triggers
- Use a standard naming convention for tags, variables, and triggers to make them easy to search
