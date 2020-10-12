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

    uploadImageOnStorage() {

        let self = this
        const file = FS.readFileSync('./images/' + this.getActualDate() + '.png')
        const ref = FIREBASE.storage().ref('figaro-news/' + this.getActualDate())

        ref.put(file)
        .then(function(snapshot) {
            console.log(snapshot)
            console.log("[*] Screenshot uploaded !")
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    getActualDate() {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = dd + '-' + mm + '-' + "20";

        return date;

    }

    async getNewsScreenShot() {

        // Initialzing Chromium
        const BROWSER = await PUPPETEER.launch();
        const PAGE = await BROWSER.newPage();

        // Unzoom browser page
        const SESSION = await PAGE.target().createCDPSession();
        await SESSION.send('Emulation.setPageScaleFactor', {
            pageScaleFactor: 0.75,
        });

        // Redirect to Page
        await PAGE.goto(this.URL, { waitUntil: 'networkidle0' });
        //await PAGE.waitForSelector("button[class='iubenda-cs-accept-btn iubenda-cs-btn-primary']", { visible: true });
        //await PAGE.click("button[class='iubenda-cs-accept-btn iubenda-cs-btn-primary']").catch(function(err) {console.log(err)})

        //await PAGE.pdf({ path: './images/' + this.getActualDate() + '.pdf', format: 'A4', height: 1000 });
        await PAGE.screenshot({ path: './images/' + this.getActualDate() + '.png', fullPage: true }).then(function() {
            console.log("[*] ScreenShot Registered !")
        });


        await BROWSER.close();
    }
}

const FigaroBot = new FigaroNewsArchiver("https://www.lefigaro.fr/")
FigaroBot.getNewsScreenShot().then(function() {
    FigaroBot.uploadImageOnStorage()
})