const PUPPETEER = require('puppeteer')
const FIREBASE = require('firebase/app')
const FS = require('fs')
const FIREBASE_CONFIG = require('./firebaseConfig')
require('firebase/storage')
global.XMLHttpRequest = require("xhr2");

class FigaroNewsArchiver {

    constructor(url) {
        this.URL = url
        FIREBASE.initializeApp(FIREBASE_CONFIG.firebaseConfig)
    }

    uploadImageOnStorage(file) {

        const REF = FIREBASE.storage().ref('/figaro-news/' + this.getActualDate())
        REF.put(file).then(function () {
            console.log("[*] Screenshot uploaded !")
            REF.updateMetadata({ cacheControl: 'public,max-age=300', contentType: 'image/jpeg' }).then(function () {
                console.log("[*] Metadata Uploaded !")
            }).catch(function(err) {
                console.log(err)
            })
        }).catch(function (err) {
            console.log(err)
        })
    }

    getActualDate() {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!

        date = dd + '-' + mm + '-' + "20";

        return date;

    }

    async getNewsScreenShot() {

        // Initialzing Chromium
        const BROWSER = await PUPPETEER.launch();
        const PAGE = await BROWSER.newPage();
        const SELF = this

        // Unzoom browser page
        const SESSION = await PAGE.target().createCDPSession();
        await SESSION.send('Emulation.setPageScaleFactor', {
            pageScaleFactor: 0.75,
        });

        // Redirect to Page
        await PAGE.goto(this.URL, { waitUntil: 'networkidle0' });

        /**
         *  Only if the website have JS Protection
         * 
         *  await PAGE.waitForSelector("button[class='iubenda-cs-accept-btn iubenda-cs-btn-primary']", { visible: true });
         *  await PAGE.click("button[class='iubenda-cs-accept-btn iubenda-cs-btn-primary']").catch(function(err) {console.log(err)})
         * 
         */

        await PAGE.screenshot({ fullPage: true }).then(function (img) {
            console.log("[*] Screenshot !")
            SELF.uploadImageOnStorage(img)
        });


        await BROWSER.close();
    }
}

const FigaroBot = new FigaroNewsArchiver("https://www.lefigaro.fr/")
FigaroBot.getNewsScreenShot().then(function () {
    FigaroBot.uploadImageOnStorage()
})