import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProgressBars = ({ items, title }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'qualified':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unqualified':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'qualified':
        return 'bg-green-500';
      case 'unqualified':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'qualified':
        return '已达标';
      case 'unqualified':
        return '未达标';
      default:
        return '待评估';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{item.progress}%</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'qualified' ? 'bg-green-100 text-green-800' :
                  item.status === 'unqualified' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.status)}`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;
