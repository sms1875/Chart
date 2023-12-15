import React, { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

const ALL_OPTIONS = '전체';

/**
 * 필터 섹션 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.filterType - 현재 선택된 필터 타입
 * @param {string} props.filterValue - 현재 선택된 필터 값
 * @param {function} props.onFilterChange - 필터 변경 시 호출되는 콜백 함수
 * @param {Array} props.surveyItems - 설문 항목 목록
 * @returns {JSX.Element} - 렌더링된 필터 섹션 컴포넌트
 */
const FilterSection = ({ filterType, filterValue, onFilterChange, surveyItems }) => {
  // 필터 타입 변경 시 필터 값 초기화
  useEffect(() => {
    onFilterChange(filterType, "");
  }, [filterType, onFilterChange]);

  return (
    <>
      {/* 필터 타입 선택 */}
      <TextField
        id="filter-type"
        select
        label="필터 타입"
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value, "")}
        fullWidth
      >
        <MenuItem value={ALL_OPTIONS}>{ALL_OPTIONS}</MenuItem>
        {surveyItems.map((item) => (
          <MenuItem key={item.title} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </TextField>

      {/* 필터 값 선택 */}
      {filterType && filterType !== ALL_OPTIONS && (
        <TextField
          id="filter-value"
          select
          label={`필터 값 (${filterType})`}
          value={filterValue}
          onChange={(e) => onFilterChange(filterType, e.target.value)}
          fullWidth
        >
          {surveyItems
            .find((item) => item.title === filterType)
            .categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
        </TextField>
      )}
    </>
  );
};

export default FilterSection;
