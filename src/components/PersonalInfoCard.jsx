import React from 'react';
import { User, GraduationCap, Award, TrendingUp, Star } from 'lucide-react';

const PersonalInfoCard = ({ employee }) => {
  const getPerformanceStars = (rating) => {
    const stars = [];
    const fullStars = rating === 'A' ? 5 : rating === 'B+' ? 4 : rating === 'B' ? 3 : 2;
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">个人基础信息</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">姓名</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{employee.name}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Award className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">当前岗位</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{employee.currentPosition}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">学历</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{employee.education}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Award className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">职称</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{employee.title}</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">技能等级</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{employee.skillLevel}</p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">绩效表现</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">近一年:</span>
              <div className="flex items-center space-x-1">
                {getPerformanceStars(employee.performance.lastYear)}
                <span className="text-sm font-semibold text-gray-800 ml-1">
                  {employee.performance.lastYear}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">当前季度:</span>
              <div className="flex items-center space-x-1">
                {getPerformanceStars(employee.performance.currentQuarter)}
                <span className="text-sm font-semibold text-gray-800 ml-1">
                  {employee.performance.currentQuarter}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
