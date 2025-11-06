import React, { useState } from 'react';
import { mockEmployee, positionStandards, getPositionLevels, checkQualificationStatus } from '../data/employeeData';

const getPositionList = () => {
  // 按原有分组，合并所有岗位
  const technicalPositions = ['三级专责', '二级专责', '一级专责'];
  const skillPositions = ['副值', '主值', '值班长', '500kV巡维中心站长'];
  const managementPositions = ['部门副主任', '部门主任'];
  return [
    { group: '技术通道', positions: technicalPositions },
    { group: '技能通道', positions: skillPositions },
    { group: '管理通道', positions: managementPositions }
  ];
};

const QualificationReport = () => {
  // 默认选中 mockEmployee.currentPosition
  const [selected, setSelected] = useState(mockEmployee.currentPosition);
  // 获取当前和下一级岗位
  const positionLevels = getPositionLevels(selected);
  const currentStatus = checkQualificationStatus(mockEmployee, positionLevels.current);
  const nextStatus = positionLevels.next ? checkQualificationStatus(mockEmployee, positionLevels.next) : null;

  return (
    <div className="min-h-screen w-full bg-[#eaf0ff] flex flex-col">
      <div className="w-full max-w-7xl mx-auto py-10 flex gap-10">
        {/* 左侧晋升通道图 */}
        <div className="w-[400px] relative">
          {/* 渐变通道背景 */}
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none">
            <svg width="400" height="700" viewBox="0 0 400 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',left:0,top:0}}>
              <path d="M200 700C200 700 200 400 200 40C200 20 220 10 240 20C260 30 320 60 380 120" stroke="#b3d8ff" strokeWidth="30" opacity="0.3"/>
              <path d="M200 700C200 700 200 400 200 40C200 20 180 10 160 20C140 30 80 60 20 120" stroke="#b3d8ff" strokeWidth="30" opacity="0.3"/>
              <rect x="120" y="20" width="160" height="660" rx="80" fill="url(#grad)"/>
              <defs>
                <linearGradient id="grad" x1="200" y1="20" x2="200" y2="680" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6"/>
                  <stop offset="1" stopColor="#eaf0ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* 岗位级别按钮分组 */}
          <div className="flex flex-col items-center justify-center w-full h-full z-10 pt-10">
            {getPositionList().map((group) => (
              <div key={group.group} className="mb-8 w-full">
                <div className="font-semibold text-blue-700 mb-2 text-center">{group.group}</div>
                <ul>
                  {group.positions.map((pos) => (
                    <li
                      key={pos}
                      className={`relative w-40 h-12 flex items-center justify-center mx-auto my-2 rounded-full transition-all duration-200 cursor-pointer text-lg ${selected === pos ? 'bg-[#3b82f6] text-white shadow-lg scale-110' : 'bg-[#eaf0ff] text-[#3b82f6]'} `}
                      onClick={() => setSelected(pos)}
                    >
                      {selected === pos && (
                        <>
                          <span className="absolute left-[-120px] top-1/2 -translate-y-1/2 px-3 py-1 bg-[#3beaf6] text-white rounded-full text-xs shadow">任职条件</span>
                          <span className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-lg">&lt;&lt;</span>
                        </>
                      )}
                      <span>{pos}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* 右侧岗位任职资格详情 */}
        <div className="flex-1 h-full flex flex-col justify-start items-start pt-10">
          <div className="text-2xl font-bold text-[#3b82f6] mb-4">{selected} 任职资格</div>
          <ul className="mb-6">
            {currentStatus ? (
              Object.entries(currentStatus).map(([key, value]) => (
                <li key={key} className={`mb-3 text-lg flex items-center ${value.qualified ? 'text-gray-700' : 'text-red-600 font-bold'}`}>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#3b82f6] mr-3"></span>
                  <span>{getCategoryTitle(key)}：</span>
                  <span className="ml-2">{value.actual} <span className="ml-2 text-gray-500">（要求：{value.required}）</span></span>
                </li>
              ))
            ) : <li className="text-gray-500">暂无数据</li>}
          </ul>
          {/* 下一级别岗位任职资格及未达标项 */}
          {positionLevels.next && (
            <div className="mt-6">
              <div className="text-xl font-semibold text-blue-700 mb-2">晋升到「{positionLevels.next}」需满足：</div>
              <ul>
                {Object.entries(checkQualificationStatus(mockEmployee, positionLevels.next)).map(([key, value]) => (
                  <li key={key} className={`mb-3 text-lg flex items-center ${value.qualified ? 'text-gray-700' : 'text-red-600 font-bold'}`}>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#3b82f6] mr-3"></span>
                    <span>{getCategoryTitle(key)}：</span>
                    <span className="ml-2">{value.actual} <span className="ml-2 text-gray-500">（要求：{value.required}）</span></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!positionLevels.next && (
            <div className="text-gray-500 mt-6">已是最高级别岗位</div>
          )}
        </div>
      </div>
    </div>
  );
};

const getCategoryTitle = (key) => {
  const titles = {
    education: '学历要求',
    title: '职称要求',
    performance: '绩效要求',
    experience: '工作经验'
  };
  return titles[key] || key;
};

export default QualificationReport;
