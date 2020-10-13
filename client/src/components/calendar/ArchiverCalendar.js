import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import firebase from 'firebase/app'
import 'firebase/storage'
import './archiverCalendar.css'

class ArchiverCalendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: <h1 className="archiver-calendar-title">Choisir une date !</h1>
        }
    }

    getNumberMyMonth(month) {
        if (month === "Jan") return "01"
        else if (month === "Feb") return "02"
        else if (month === "Mar") return "03"
        else if (month === "Apr") return "04"
        else if (month === "May") return "05"
        else if (month === "Jun") return "06"
        else if (month === "Jul") return "07"
        else if (month === "Aug") return "08"
        else if (month === "Sep") return "09"
        else if (month === "Oct") return "10"
        else if (month === "Nov") return "11"
        else if (month === "Dec") return "12"
    }

    convertToNumericalDate(date) {
        const choppedDate = date.substring(3, 13)

        const MONTH = this.getNumberMyMonth(choppedDate.substring(1, 4))
        const DAY = choppedDate.substring(5, 7)
        const YEAR = choppedDate.substring(8, 10)

        this.getImageByDate(DAY + "-" + MONTH + "-" + YEAR)
    }

    getImageByDate(date) {

        const self = this

        firebase.storage().ref('figaro-news/' + date).getDownloadURL().then(function (url) {
            console.log(url)
        self.setState({ date:  <center><p className="archiver-calendar-title">Article du {date}</p><img src={url} alt={date} className="archiver-calendar-image"/></center> })
        })
        .catch(function(err) {
            if(err) self.setState({ date: <p className="archiver-calendar-title">Il n'y a pas d'article pour ce jour</p> })
        })
    }

    render() {
        return (
            <div className="archiver-calendar-container">
                <p className="archiver-calendar-title">Retrouver la une des articles</p>
                <InfiniteCalendar
                    className="archiver-calendar"
                    width={"90%"}
                    onSelect={(e) => { this.convertToNumericalDate(e.toString()) }}
                    displayOptions={{
                        layout: 'landscape',
                        showOverlay: false,
                        shouldHeaderAnimate: false
                    }}
                />
                {this.state.date}
            </div>
        )
    }
}

export default ArchiverCalendar