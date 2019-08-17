const React = ('react');

function openNewAuthWindow(myUrl) {
   //Open the new window
   const authWindow = window.open(myUrl, '_blank');
   //Listen for messages from authWindow
   const authPromise = new Promise((resolve, reject)=> {
      window.addEventListener('message', (msg) => {
         if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)){
            authWindow.close();
            reject('Not allowed')
         }
         if (msg.data.payload) {
            try {
               resolve(JSON.parse(msg.data.payload))
            }
            catch {
               resolve(msg.data.payload)
            }
            finally {
               authWindow.close()
            }
         }else {
            authWindow.close()
            reject('Unauthorized')
         }
      }, false)
   })
   return authPromise
}
export default openNewAuthWindow;