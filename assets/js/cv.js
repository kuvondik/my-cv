
import moment from 'moment';
import DatesYMD from 'diff-ymd-package';

document.querySelectorAll("[data-start-date]").forEach((el) => {
    let startDate = moment(el.getAttribute("data-start-date"),"DD.MM.YYYY").toDate();
    let endDate = moment(el.getAttribute("data-end-date"),"DD.MM.YYYY").toDate();
    
    if (isNaN(endDate))
        endDate = moment().toDate();

    el.innerHTML = getDateDiffTemplateInYrsAndMnths(startDate, endDate);
});

function getDateDiffTemplateInYrsAndMnths(startDate, endDate) {
    let formatter = DatesYMD.diffDates(startDate, endDate)
    let months = formatter.diffInMonths() + 2;
    let years = 0;

    if (months >= 12) {
        years = Math.floor(months / 12);
        months = months - years * 12 - 1;
    }

    let monthsText = months > 1 ? "mos" : "mo";
    let yearsText = years > 1 ? "yrs" : "yr";
    
    return years > 0 ? 
        `${years} ${yearsText} ${months} ${monthsText }`: 
        `${months} ${monthsText }`;
}