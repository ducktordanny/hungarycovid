# Hungary Covid And Other Datas

## To do:

* [x] Finish route containers
* [x] Server side refreshes
* [ ] Map's link not available after a day. Somehow I should save it.
* [ ] API refresh after 30 mins of cachedTime
* [ ] Check for any bug or issue before publish. Optimization.
* [ ] Publish

## Issue:

* [x] Heroku Scheduler not refreshing... It gets a connect ETIMEOUT (https://stackoverflow.com/questions/33350604/what-could-cause-connect-etimedout-error-when-the-url-is-working-in-browser) => The https://koronavirus.gov.hu had an issue

Check these (not sure if it is required):

https://create-react-app.dev/docs/proxying-api-requests-in-development/
https://www.debuggr.io/react-update-unmounted-component/
https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm