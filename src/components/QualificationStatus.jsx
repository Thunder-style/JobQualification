import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const QualificationStatus = ({ title, status, details }) => {
  const getStatusIcon = (qualified) => {
    if (qualified === true) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (qualified === false) {
      return <XCircle className="h-6 w-6 text-red-600" />;
    } else {
      return <AlertCircle className="h-6 w-6 text-yellow-600" />;
    }
  };

  const getStatusColor = (qualified) => {
    if (qualified === true) {
      return 'from-green-50 to-green-100 border-green-200';
    } else if (qualified === false) {
      return 'from-red-50 to-red-100 border-red-200';
    } else {
      return 'from-yellow-50 to-yellow-100 border-yellow-200';
    }
  };

  const getStatusText = (qualified) => {
    if (qualified === true) {
      return '已达标';
    } else if (qualified === false) {
      return '未达标';
    } else {
      return '待评估';
    }
  };

  const getStatusBadgeColor = (qualified) => {
    if (qualified === true) {
      return 'bg-green-100 text-green-800';
    } else if (qualified === false) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className={`rounded-lg border-2 p-4 mb-4 bg-gradient-to-r ${getStatusColor(status.qualified)}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon(status.qualified)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(status.qualified)}`}>
            {getStatusText(status.qualified)}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">要求标准</span>
          </div>
          <p className="text-sm text-gray-800">{status.required}</p>
        </div>
        
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">当前状态</span>
          </div>
          <p className="text-sm text-gray-800">{status.actual}</p>
        </div>
        
        {details && (
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">详细说明</span>
            </div>
            <p className="text-sm text-gray-800">{details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualificationStatus;
