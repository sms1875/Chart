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
    {
        title: 'Item 6',
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
        requiredResponses: true,
      },
      {
        title: 'Item 7',
        categories: ['Category A', 'Category B', 'Category C'],
        requiredResponses: false,
      },
      {
        title: 'Item 8',
        categories: ['Category X', 'Category Y', 'Category Z', 'Category W'],
        requiredResponses: true,
      },
      {
        title: 'Item 9',
        categories: ['Category One', 'Category Two', 'Category Three'],
        requiredResponses: false,
      },
      {
        title: 'Item 10',
        categories: ['Category Alpha', 'Category Beta', 'Category Gamma'],
        requiredResponses: true,
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

    const generatedSurveys = Array.from({ length: 200 }, generateRandomSurvey);
    return generatedSurveys;
};

export const generatedData1 = {
    surveys: generateRandomSurveyData(surveyItem1),
};

export const generatedData2 = {
    surveys: generateRandomSurveyData(surveyItem2),
};

export const surveyList = [
    {
        id: 1,
        title: '설문조사 1',
        description: '설문조사 1에 대한 설명',
        items: surveyItem1,
        generatedData: generatedData1,
    },
    {
        id: 2,
        title: '설문조사 2',
        description: '설문조사 2에 대한 설명',
        items: surveyItem2,
        generatedData: generatedData2,
    },
];