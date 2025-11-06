import React from 'react';
import { TrendingUp, Target, CheckCircle, XCircle } from 'lucide-react';
import QualificationStatus from './QualificationStatus';
import { checkQualificationStatus } from '../data/employeeData';

const PositionComparison = ({ employee, currentPosition, nextPosition }) => {
  const currentStatus = checkQualificationStatus(employee, currentPosition);
  const nextStatus = nextPosition ? checkQualificationStatus(employee, nextPosition) : null;

  const getComparisonData = () => {
    if (!nextStatus) return [];
    
    return Object.keys(currentStatus).map(key => {
      const current = currentStatus[key];
      const next = nextStatus[key];
      
      return {
        category: key,
        currentQualified: current.qualified,
        nextQualified: next.qualified,
        requirement: next.required,
        currentStatus: current.actual,
        nextStatus: next.actual
      };
    });
  };

  const comparisonData = getComparisonData();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">岗位任职资格对比分析</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 当前岗位达标情况 */}
        <div>
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">当前岗位: {currentPosition}</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(currentStatus).map(([key, status]) => (
              <QualificationStatus
                key={key}
                title={getCategoryTitle(key)}
                status={status}
              />
            ))}
          </div>
        </div>

        {/* 下一级别岗位对比 */}
        {nextPosition && (
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">下一级别: {nextPosition}</h3>
            </div>
            
            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">{getCategoryTitle(item.category)}</h4>
                    <div className="flex items-center space-x-2">
                      {item.nextQualified ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">要求: </span>
                      <span className="text-sm text-gray-800">{item.requirement}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">现状: </span>
                      <span className="text-sm text-gray-800">{item.currentStatus}</span>
                    </div>
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.nextQualified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.nextQualified ? '已满足' : '未满足'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

export default PositionComparison;
