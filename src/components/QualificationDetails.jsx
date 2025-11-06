import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const QualificationDetails = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const qualificationRules = {
    '专业技术类': {
      '一级专责': {
        education: '本科',
        title: '高级',
        experience: '近三年网公司二等奖及以上级别奖励或表彰（不重复使用），在上一个岗级岗位工作满2年，近三年年度A至少1次',
        performance: '近三年年度绩效连续3年评定为A'
      },
      '二级专责': {
        education: '本科',
        title: '中级',
        experience: '近三年公司二等奖及以上级别奖励或表彰等（不重复使用），近三年年度绩效A至少1次，在上一个岗级岗位工作满2年',
        performance: '近三年年度绩效连续2年评定为A'
      },
      '三级专责': {
        education: '本科',
        title: '中级',
        experience: '近一年季度A至少1次',
        performance: '近一年季度A至少1次'
      }
    },
    '技能类': {
      '500kV巡维中心站长': {
        education: '本科',
        title: '高级技师',
        experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
        performance: '近一年季度A至少1次'
      },
      '值班长': {
        education: '大专',
        title: '技师',
        experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
        performance: '近一年季度A至少1次'
      },
      '主值': {
        education: '大专',
        title: '高级工',
        experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
        performance: '近一年季度A至少1次'
      },
      '副值': {
        education: '中专/技校',
        title: '中级工',
        experience: '在下一层级岗位工作满1年，近一年季度A至少1次',
        performance: '近一年季度A至少1次'
      }
    },
    '管理类': {
      '部门主任': {
        education: '本科',
        title: '高级',
        experience: '在副主任岗位工作满2年，近三年年度绩效A至少2次',
        performance: '近三年年度绩效连续2年评定为A'
      },
      '部门副主任': {
        education: '本科',
        title: '中级',
        experience: '在主管岗位工作满2年，近三年年度绩效A至少1次',
        performance: '近三年年度绩效连续2年评定为A'
      }
    }
  };

  const generalRequirements = [
    '1. 所有岗位均需具备良好的职业道德和敬业精神',
    '2. 身体健康，能够胜任岗位工作要求',
    '3. 无违法违纪记录，遵守公司各项规章制度',
    '4. 具备岗位所需的专业知识和技能',
    '5. 具备良好的沟通协调能力和团队合作精神',
    '6. 能够适应岗位工作强度和压力',
    '7. 具备持续学习和自我提升的意愿和能力'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Book className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">任职资格标准详情</h2>
      </div>

      <div className="space-y-4 mb-8">
        {Object.entries(qualificationRules).map(([category, positions]) => (
          <div key={category} className="border rounded-lg">
            <button
              onClick={() => toggleSection(category)}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between"
            >
              <span className="text-lg font-semibold text-gray-800">{category}</span>
              {expandedSections[category] ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            {expandedSections[category] && (
              <div className="p-4 space-y-4">
                {Object.entries(positions).map(([position, requirements]) => (
                  <div key={position} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{position}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">学历要求: </span>
                        <span className="text-sm text-gray-800">{requirements.education}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">职称要求: </span>
                        <span className="text-sm text-gray-800">{requirements.title}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-sm font-medium text-gray-600">工作经验: </span>
                        <span className="text-sm text-gray-800">{requirements.experience}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-sm font-medium text-gray-600">绩效要求: </span>
                        <span className="text-sm text-gray-800">{requirements.performance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 通用任职要求 */}
      <div className="border-t pt-6">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">通用任职要求</h3>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <ul className="space-y-2">
            {generalRequirements.map((requirement, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QualificationDetails;
