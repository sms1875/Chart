import React, { useState, useRef } from "react";
import SurveyReport from "./SurveyReport";
import PrintButton from "./PrintButton";
import { ChartItem } from "pages/survey/surveyData";

/**
 * YYYYMM 입력 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onChangeYear - 년도 입력 변경 핸들러
 * @param {Function} props.onChangeMonth - 월 입력 변경 핸들러
 * @param {string} props.valueYear - 년도 입력 값
 * @param {string} props.valueMonth - 월 입력 값
 */
const YearMonthInput = ({ onChangeYear, onChangeMonth, valueYear, valueMonth }) => (
  <div>
    <input type="number" placeholder="년도" value={valueYear} onChange={onChangeYear} />
    <input type="number" placeholder="월" value={valueMonth} onChange={onChangeMonth} />
  </div>
);

/**
 * 설문 결과를 표시하는 컴포넌트
 * @returns {JSX.Element} - 렌더링된 설문 결과 컴포넌트
 */
const SurveyResults = () => {
  // 프린트를 위한 레퍼런스
  const printRef = useRef();

  // 검색 기간과 기준 기간 상태
  const [searchPeriod, setSearchPeriod] = useState({
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
  });

  const [baselinePeriod, setBaselinePeriod] = useState({
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
  });

  const [showReport, setShowReport] = useState(false); // 리포트 표시 여부 상태
  const [chartKey, setChartKey] = useState(0); // SurveyReport 키 관리 상태

  /**
   * Input 변경 핸들러
   * @param {string} field - 필드 이름 (startYear, startMonth, endYear, endMonth)
   * @param {Object} event - 변경 이벤트 객체
   * @param {Function} setState - 상태를 변경하는 함수
   */
  const handleInputChange = (field, event, setState) => {
    const { value } = event.target;
    setState((prevValue) => ({ ...prevValue, [field]: value }));
  };

  /**
   * 검색 버튼 클릭 핸들러
   */
  const handleSearchClick = () => {
    // TODO: searchPeriod, baselinePeriod 값이 유효한지 검사

    // TODO: searchPeriod를 이용하여 데이터를 검색하고, 검색된 데이터를 통해 ChartItem 생성

    // ChartItem에 baseline 추가
    ChartItem.baseline = { start: baselinePeriod.startYear + baselinePeriod.startMonth, end: baselinePeriod.endYear + baselinePeriod.endMonth };

    // SurveyReport를 다시 렌더링하기 위한 키 업데이트
    setChartKey((prevKey) => prevKey + 1);

    setShowReport(true);
  };

  return (
    <div className="App">
      {/* 헤더 */}
      <div className="header" style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
        {/* 프린트 버튼 */}
        <PrintButton printRef={printRef} />
      </div>

      {/* 검색월 선택 */}
      <div>
        <label htmlFor="baselineInput">검색월 선택</label>
        <YearMonthInput
          onChangeYear={(e) => handleInputChange("startYear", e, setSearchPeriod)}
          onChangeMonth={(e) => handleInputChange("startMonth", e, setSearchPeriod)}
          valueYear={searchPeriod.startYear}
          valueMonth={searchPeriod.startMonth}
        />
        <YearMonthInput
          onChangeYear={(e) => handleInputChange("endYear", e, setSearchPeriod)}
          onChangeMonth={(e) => handleInputChange("endMonth", e, setSearchPeriod)}
          valueYear={searchPeriod.endYear}
          valueMonth={searchPeriod.endMonth}
        />
      </div>

      {/* 기준월 선택 */}
      <div>
        <label htmlFor="baselineInput">기준월 선택</label>
        <YearMonthInput
          onChangeYear={(e) => handleInputChange("startYear", e, setBaselinePeriod)}
          onChangeMonth={(e) => handleInputChange("startMonth", e, setBaselinePeriod)}
          valueYear={baselinePeriod.startYear}
          valueMonth={baselinePeriod.startMonth}
        />
        <YearMonthInput
          onChangeYear={(e) => handleInputChange("endYear", e, setBaselinePeriod)}
          onChangeMonth={(e) => handleInputChange("endMonth", e, setBaselinePeriod)}
          valueYear={baselinePeriod.endYear}
          valueMonth={baselinePeriod.endMonth}
        />
      </div>

      {/* 검색 버튼 */}
      <div>
        <button onClick={handleSearchClick}>검색</button>
      </div>

      {/* 리포트 */}
      <div>
        {/* 리포트 표시 여부가 true일 때 SurveyReport 렌더링 */}
        {showReport && <SurveyReport key={chartKey} ChartItem={ChartItem} ref={printRef} />}
      </div>
    </div>
  );
};

export default SurveyResults;
