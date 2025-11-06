import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoCard from './PersonalInfoCard';
import PositionComparison from './PositionComparison';
import QualificationDetails from './QualificationDetails';
import QualificationRingChart from './QualificationRingChart';
import ProgressBars from './ProgressBars';
import QualificationRadarChart from './QualificationRadarChart';
import { mockEmployee, getPositionLevels, checkQualificationStatus } from '../data/employeeData';

const QualificationReport = () => {
  const [activeTab, setActiveTab] = useState('report');
  
  const positionLevels = getPositionLevels(mockEmployee.currentPosition);
  const currentStatus = checkQualificationStatus(mockEmployee, positionLevels.current);
  const nextStatus = positionLevels.next ? checkQualificationStatus(mockEmployee, positionLevels.next) : null;

  // 处理环形图数据
  const getRingChartData = (status) => {
    const qualified = Object.values(status).filter(item => item.qualified === true).length;
    const unqualified = Object.values(status).filter(item => item.qualified === false).length;
    const pending = Object.values(status).filter(item => item.qualified === null).length;
    
    return { qualified, unqualified, pending };
  };

  // 处理进度条数据
  const getProgressData = (status) => {
    return Object.entries(status).map(([key, value]) => ({
      name: getCategoryTitle(key),
      status: value.qualified ? 'qualified' : value.qualified === false ? 'unqualified' : 'pending',
      progress: value.qualified ? 100 : value.qualified === false ? 30 : 60,
      description: `要求: ${value.required}`
    }));
  };

  // 处理雷达图数据
  const getRadarData = (current, target) => {
    return {
      current: {
        education: current.education.qualified ? 100 : 60,
        title: current.title.qualified ? 100 : 70,
        performance: current.performance.qualified ? 100 : 80,
        experience: current.experience.qualified ? 100 : 90,
        skill: 85
      },
      target: {
        education: 100,
        title: 100,
        performance: 100,
        experience: 100,
        skill: 100
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">岗位任职资格标准报告</h1>
          <p className="text-gray-600">深圳供电局有限公司 - 个人任职资格分析报告</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="report">个人报告</TabsTrigger>
            <TabsTrigger value="details">标准详情</TabsTrigger>
          </TabsList>
          
          <TabsContent value="report" className="space-y-6">
            <PersonalInfoCard employee={mockEmployee} />
            
            {/* 可视化分析区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QualificationRingChart 
                data={getRingChartData(currentStatus)} 
                title="当前岗位达标情况"
              />
              {nextStatus && (
                <QualificationRingChart 
                  data={getRingChartData(nextStatus)} 
                  title="下一级别岗位达标情况"
                />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressBars 
                items={getProgressData(currentStatus)}
                title="当前岗位详细进度"
              />
              {nextStatus && (
                <ProgressBars 
                  items={getProgressData(nextStatus)}
                  title="下一级别岗位详细进度"
                />
              )}
            </div>

            {nextStatus && (
              <QualificationRadarChart 
                currentData={getRadarData(currentStatus, nextStatus).current}
                targetData={getRadarData(currentStatus, nextStatus).target}
                title="能力差距分析"
              />
            )}

            <PositionComparison 
              employee={mockEmployee}
              currentPosition={positionLevels.current}
              nextPosition={positionLevels.next}
            />
          </TabsContent>
          
          <TabsContent value="details">
            <QualificationDetails />
          </TabsContent>
        </Tabs>
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
