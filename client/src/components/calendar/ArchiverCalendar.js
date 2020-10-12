import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import './archiverCalendar.css'

class ArchiverCalendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: ""
        }
    }

    getNumberMyMonth(month) {
        if(month === "Jan") return "01"
        else if(month === "Feb") return "02"
        else if(month === "Mar") return "03"
        else if(month === "Apr") return "04"
        else if(month === "May") return "05"
        else if(month === "Jun") return "06"
        else if(month === "Jul") return "07"
        else if(month === "Aug") return "08"
        else if(month === "Sep") return "09"
        else if(month === "Oct") return "10"
        else if(month === "Nov") return "11"
        else if(month === "Dec") return "12"
    }

    convertToNumericalDate(date) {
        const choppedDate = date.substring(3, 13)

        const MONTH = this.getNumberMyMonth(choppedDate.substring(1, 4))
        const DAY = choppedDate.substring(5, 7)
        const YEAR = choppedDate.substring(8, 10)
        
        return DAY + "-" + MONTH + "-" + YEAR
    }
    break

    render() {
        return (
            <div className="archiver-calendar-container">
                <p className="archiver-calendar-title">Retrouver la une des articles</p>
                <p>{this.state.date}</p>
                <InfiniteCalendar
                    className="archiver-calendar"
                    width={"90%"}
                    onSelect={(e) => { this.setState({ date: this.convertToNumericalDate(e.toString()) }) }}
                    displayOptions={{
                        layout: 'landscape',
                        showOverlay: false,
                        shouldHeaderAnimate: false
                    }}
                />
            </div>
        )
    }
}

export default ArchiverCalendar