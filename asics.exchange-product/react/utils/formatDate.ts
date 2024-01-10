export default function FormattedDate(date: Date) {

    try {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

        const dateFormat = date.toLocaleDateString("pr-BR", options);

        return dateFormat
    } catch (error) {
        return ""
    }

}