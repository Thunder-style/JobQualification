import React, { useState, useEffect } from 'react';
import { mockEmployee, positionStandards, getPositionLevels, checkQualificationStatus } from '../data/employeeData';

const getPositionList = () => {
  // 按原有分组，合并所有岗位，按从高到低排序
  const technicalPositions = ['一级专责', '二级专责', '三级专责'];
  const skillPositions = ['巡维站长', '值班长', '主值', '副值'];
  const managementPositions = ['部门主任', '部门副主任'];
  return [
    { group: '技术通道', positions: technicalPositions },
    { group: '技能通道', positions: skillPositions },
    { group: '管理通道', positions: managementPositions }
  ];
};

const QualificationReport = () => {
  // 默认选中 mockEmployee.currentPosition
  const [selected, setSelected] = useState(mockEmployee.currentPosition);
  // 用于控制动画状态
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  // 获取当前和下一级岗位
  const positionLevels = getPositionLevels(selected);
  const currentStatus = checkQualificationStatus(mockEmployee, positionLevels.current);
  const nextStatus = positionLevels.next ? checkQualificationStatus(mockEmployee, positionLevels.next) : null;
  
  // 页面加载动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 处理岗位选择，添加切换动画
  const handlePositionSelect = (position) => {
    if (selected === position) return;
    
    setIsChanging(true);
    setTimeout(() => {
      setSelected(position);
      setIsChanging(false);
    }, 300);
  };

  return (
      <div className={`min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      {/* 员工信息卡片 */}
        <div className="w-full max-w-7xl mx-auto pt-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex-1 min-w-[280px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="text-sm font-medium text-gray-500">姓名</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockEmployee.name}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex-1 min-w-[280px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-sm font-medium text-gray-500">当前岗位</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockEmployee.currentPosition}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex-1 min-w-[280px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div className="text-sm font-medium text-gray-500">部门</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockEmployee.department}</div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto pb-16 px-4 flex flex-col lg:flex-row gap-6 flex-1">
        {/* 左侧晋升通道图 */}
        <div className="w-full lg:w-[400px] relative min-h-[800px] h-[800px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
          {/* 改进的渐变通道背景 */}
          <div className="absolute left-0 top-0 w-full bottom-0 flex items-center justify-center pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 1000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',left:0,top:0,height:'100%',width:'100%'}}>
                {/* 优化的多边形形状，顶部更圆润 */}
                <polygon points="200,20 100,60 130,980 270,980 300,60" fill="url(#grad)" rx="10" ry="10" />
                <defs>
                <linearGradient id="grad" x1="200" y1="0" x2="200" y2="990" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#2563eb" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
                </linearGradient>
                </defs>
                {/* 添加流动光效 */}
                <path 
                d="M100,60 Q200,0 300,60 L300,100 Q200,40 100,100 Z" 
                fill="url(#lightEffect)" 
                opacity="0.5"
                />
                <defs>
                <radialGradient id="lightEffect" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                </defs>
                </svg>
          </div>
          {/* 通道标题 */}
            <div className="absolute top-4 left-0 right-0 text-center z-20">
              <div className="bg-white/90 text-blue-800 font-bold text-base sm:text-xl py-1 sm:py-2 px-4 sm:px-6 inline-block rounded-full shadow-lg">
                晋升通道
              </div>
            </div>
          {/* 岗位级别按钮分组 */}
            <div className="flex flex-col items-center justify-center w-full h-full z-10 pt-16 pb-12 px-4">
            {/* 合并所有岗位到一个连续的列表中 */}
            {[
              ...getPositionList()[2].positions,
              ...getPositionList()[1].positions,
              ...getPositionList()[0].positions
            ].map((pos, index) => {
              // 根据不同通道设置不同的选中背景色
              let bgColor = 'bg-white/30';
              let borderColor = '';
              if (getPositionList()[2].positions.includes(pos)) {
                borderColor = 'border-purple-300';
              } else if (getPositionList()[1].positions.includes(pos)) {
                borderColor = 'border-green-300';
              } else {
                borderColor = 'border-blue-300';
              }
              
              return (
                <li
                  key={pos}
                  className={`relative w-full max-w-[180px] h-12 sm:h-14 flex items-center justify-center mx-auto my-2.5 rounded-xl transition-all duration-300 cursor-pointer text-base sm:text-lg font-medium
                    ${selected === pos 
                      ? `bg-white/40 text-white shadow-xl scale-110 border-2 ${borderColor}` 
                      : 'text-white/80 hover:text-white hover:bg-white/20 transform hover:translate-x-2'}`}
                  onClick={() => handlePositionSelect(pos)}
                >
                  <span>{pos}</span>
                  {selected === pos && (
                    <span className="absolute -right-1 w-3 h-3 bg-white rounded-full"></span>
                  )}
                </li>
              );
            })}
          </div>
        </div>
        {/* 右侧岗位任职资格详情 */}
        <div className="flex-1 h-full flex flex-col justify-center items-start">
          {/* 当前岗位任职资格卡片 */}
          <div className={`w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 transition-all duration-500 border border-gray-100 transform
            ${isChanging ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
            {selected === '二级专责' ? (
              <>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="text-lg sm:text-xl font-bold text-blue-700">当前任职资格</div>
                </div>
                <div className="bg-white rounded-lg border border-blue-100 p-4 shadow-inner">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="text-sm text-blue-700 font-medium mb-1">岗位系列</div>
                      <div className="font-medium">二级专责</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="text-sm text-blue-700 font-medium mb-1">学历</div>
                      <div className="font-medium">本科</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="text-sm text-blue-700 font-medium mb-1">职称要求</div>
                      <div className="font-medium">中级</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="text-sm text-blue-700 font-medium mb-1">胜任等级</div>
                      <div className="font-medium">无</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 sm:col-span-2">
                      <div className="text-sm text-blue-700 font-medium mb-1">工作业绩</div>
                      <div className="font-medium">近一年季度A，2次</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="text-lg sm:text-xl font-bold text-blue-700">{selected} 任职资格</div>
                </div>
                {currentStatus ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(currentStatus).map(([key, value]) => (
                      <div 
                        key={key} 
                        className={`p-2 sm:p-4 rounded-lg border-l-4 transition-all duration-300
                          ${value.qualified 
                            ? 'border-green-500 bg-green-50 text-gray-700 hover:bg-green-100'
                            : 'border-red-500 bg-red-50 text-gray-700 hover:bg-red-100'}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-semibold">{getCategoryTitle(key)}</div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium
                            ${value.qualified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {value.qualified ? '已达标' : '未达标'}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                          <div className="text-sm text-gray-500 min-w-[80px]">当前：</div>
                          <div className="font-medium flex-1">{value.actual}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                          <div className="text-sm text-gray-500 min-w-[80px]">要求：</div>
                          <div className="font-medium flex-1">{value.required}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    暂无数据
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* 下一级别岗位任职资格及未达标项 */}
          {(selected === '二级专责' && positionLevels.next) && (
            <div className={`w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-500 border border-gray-100 transform delay-100
            ${isChanging ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="text-base sm:text-xl font-bold text-purple-700">晋升到「{positionLevels.next}」需满足：</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(checkQualificationStatus(mockEmployee, positionLevels.next)).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={`p-2 sm:p-4 rounded-lg border-l-4 transition-all duration-300
                      ${value.qualified 
                        ? 'border-green-500 bg-green-50 text-gray-700 hover:bg-green-100'
                        : 'border-red-500 bg-red-50 text-gray-700 hover:bg-red-100'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{getCategoryTitle(key)}</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium
                        ${value.qualified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {value.qualified ? '已达标' : '未达标'}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                      <div className="text-sm text-gray-500 min-w-[80px]">当前：</div>
                      <div className="font-medium flex-1">{value.actual}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                      <div className="text-sm text-gray-500 min-w-[80px]">要求：</div>
                      <div className="font-medium flex-1">{value.required}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 为非二级专责岗位添加隐藏的晋升卡片，保持右侧区域高度一致 */}
          {selected !== '二级专责' && (
            <div className="w-full h-[400px] opacity-0 pointer-events-none">
              {/* 占位元素，高度与二级专责的晋升卡片大致相当 */}
            </div>
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
