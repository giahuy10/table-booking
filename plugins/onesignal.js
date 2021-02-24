window.OneSignal = window.OneSignal || [];
  OneSignal.push(function () {
    OneSignal.init({
      appId: process.env.ONESIGNAL_APP_ID,
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        /* Change bold title, limited to 30 characters */
        siteName: 'OneSignal Documentation',
        /* Subtitle, limited to 90 characters */
        actionMessage: "We'd like to show you notifications for the latest news and updates.",
        /* Example notification title */
        exampleNotificationTitle: 'BMS notification',
        /* Example notification message */
        exampleNotificationMessage: 'Notification will show on your right bottom.',
        /* Text below example notification, limited to 50 characters */
        exampleNotificationCaption: 'You can unsubscribe anytime',
        /* Accept button text, limited to 15 characters */
        acceptButtonText: "ALLOW",
        /* Cancel button text, limited to 15 characters */
        cancelButtonText: "NO THANKS",
        autoAcceptTitle: 'Click Allow'
    }
    });
  });