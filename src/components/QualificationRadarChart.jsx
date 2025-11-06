import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const QualificationRadarChart = ({ currentData, targetData, title }) => {
  const data = [
    { subject: '学历要求', current: currentData.education, target: targetData.education, fullMark: 100 },
    { subject: '职称要求', current: currentData.title, target: targetData.title, fullMark: 100 },
    { subject: '绩效表现', current: currentData.performance, target: targetData.performance, fullMark: 100 },
    { subject: '工作经验', current: currentData.experience, target: targetData.experience, fullMark: 100 },
    { subject: '技能水平', current: currentData.skill, target: targetData.skill, fullMark: 100 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 12 }} />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#6b7280' }}
            tickCount={6}
          />
          <Radar
            name="当前水平"
            dataKey="current"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="目标要求"
            dataKey="target"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QualificationRadarChart;
