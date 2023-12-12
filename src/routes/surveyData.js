export const surveyItem1 = [
    {
        title: '응답자 성별',
        categories: ['남성', '여성', '기타'],
        requiredResponses: true,
    },
    {
        title: '응답자 나이대',
        categories: ['10대', '20대', '30대', '40대', '50대 이상'],
        requiredResponses: true,
    },
    {
        title: '만족도 조사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        requiredResponses: true,
    },
    {
        title: '재구매 의사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        requiredResponses: false,
    },
    {
        title: '음식 맛 평가',
        categories: ['매우맛있음', '맛있음', '보통', '별로', '매우별로'],
        requiredResponses: false,
    },
];

export const surveyItem2 = [
    {
        title: 'Favorite Programming Language',
        categories: ['JavaScript', 'Python', 'Java', 'C#', 'Ruby'],
        requiredResponses: true,
    },
    {
        title: 'Development Experience',
        categories: ['Beginner', 'Intermediate', 'Advanced'],
        requiredResponses: true,
    },
    {
        title: 'Preferred Framework',
        categories: ['React', 'Angular', 'Vue', 'Express', 'Django'],
        requiredResponses: true,
    },
    {
        title: 'Version Control System',
        categories: ['Git', 'SVN', 'Mercurial'],
        requiredResponses: false,
    },
    {
        title: 'Code Editor',
        categories: ['Visual Studio Code', 'Sublime Text', 'Atom', 'Eclipse', 'IntelliJ IDEA'],
        requiredResponses: false,
    },
];

const generateRandomSurveyData = (surveyItems) => {
    const getRandomOption = (options) => options[Math.floor(Math.random() * options.length)];

    const generateRandomSurvey = () => {
        const surveyData = {};

        surveyItems.forEach((item) => {
            const randomOption = getRandomOption(item.categories);
            surveyData[item.title] = item.requiredResponses ? randomOption : (Math.random() < 0.5 ? randomOption : null);
        });

        return surveyData;
    };

    const generatedSurveys = Array.from({ length: 120 }, generateRandomSurvey);
    return generatedSurveys;
};

export const generatedData1 = {
    surveys: generateRandomSurveyData(surveyItem1),
};

export const generatedData2 = {
    surveys: generateRandomSurveyData(surveyItem2),
};