export const useColorUtils = () => ({
    getRandomHexColor: () => {
        const randomColor = Math.floor(Math.random() * 16777215);
        let hexColor = randomColor.toString(16);

        while (hexColor.length < 6) {
            hexColor = "0" + hexColor;
        }

        return "#" + hexColor;
    },

    fileColor: (fileType) => {
        switch (fileType) {
            case 'DOCUMENT':
                return '#b0ceea'; // синій
            case 'PRESENTATION':
                return '#ffcf47'; // помаранчевий
            case 'spreadsheet':
                return '#7ED321'; // зелений
            case 'pdf':
                return '#D0021B'; // червоний
            case 'VIDEO':
                return '#9013FE'; // фіолетовий
            case 'AUDIO':
                return '#ff3c3c'; // бірюзовий
            case 'IMAGE':
                return '#edaaca'; // рожевий
            case 'archive':
                return '#9B9B9B'; // сірий
            case 'code':
                return '#2D9CDB'; // голубий
            default:
                return '#CCCCCC'; // стандартний сірий
        }
    }
});

