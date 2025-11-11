// 模拟员工数据
export const mockEmployee = {
  id: '001',
  name: '张三',
  currentPosition: '二级专责',
  department: '变电管理一所/安全监管部',
  education: '本科',
  title: '中级工程师',
  skillLevel: '高级作业员',
  performance: {
    lastYear: 'A',
    currentQuarter: 'A',
    previousQuarters: ['A', 'B+', 'A', 'A']
  },
  workExperience: 5,
  lastPromotionDate: '2022-03-15'
};

// 岗位任职资格标准数据
export const positionStandards = {
  '一级专责': {
    education: '本科',
    title: '高级',
    experience: '上一个岗级岗位工作满2年，近三年年度A至少1次',
    performance: '近三年年度绩效连续3年评定为A',
    workYears: 3
  },
  '二级专责': {
    education: '本科',
    title: '中级',
    experience: '上一个岗级岗位工作满2年，近三年年度A至少1次',
    performance: '近三年年度绩效连续2年评定为A',
    workYears: 2
  },
  '三级专责': {
    education: '本科',
    title: '中级',
    experience: '近一年季度A至少1次',
    performance: '近一年季度A至少1次',
    workYears: 1
  },
  '巡维站长': {
    education: '本科',
    title: '高级技师',
    experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
    performance: '近一年季度A至少1次',
    workYears: 1
  },
  '值班长': {
    education: '大专',
    title: '技师',
    experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
    performance: '近一年季度A至少1次',
    workYears: 1
  },
  '主值': {
    education: '大专',
    title: '高级工',
    experience: '在副职（或同等层级）岗位工作满1年，近一年季度A至少1次',
    performance: '近一年季度A至少1次',
    workYears: 1
  },
  '副值': {
    education: '中专/技校',
    title: '中级工',
    experience: '在下一层级岗位工作满1年，近一年季度A至少1次',
    performance: '近一年季度A至少1次',
    workYears: 1
  },
  '部门主任': {
    education: '本科',
    title: '高级',
    experience: '在副主任岗位工作满2年，近三年年度绩效A至少2次',
    performance: '近三年年度绩效连续2年评定为A',
    workYears: 2
  },
  '部门副主任': {
    education: '本科',
    title: '中级',
    experience: '在主管岗位工作满2年，近三年年度绩效A至少1次',
    performance: '近三年年度绩效连续2年评定为A',
    workYears: 2
  }
};

// 获取当前岗位和下一级别岗位
export const getPositionLevels = (currentPosition) => {
  const technicalPositions = ['三级专责', '二级专责', '一级专责'];
  const skillPositions = ['副值', '主值', '值班长', '巡维站长'];
  const managementPositions = ['部门副主任', '部门主任'];
  
  let positions = [];
  if (technicalPositions.includes(currentPosition)) {
    positions = technicalPositions;
  } else if (skillPositions.includes(currentPosition)) {
    positions = skillPositions;
  } else if (managementPositions.includes(currentPosition)) {
    positions = managementPositions;
  }
  
  const currentIndex = positions.indexOf(currentPosition);
  const nextPosition = currentIndex < positions.length - 1 ? positions[currentIndex + 1] : null;
  
  return {
    current: currentPosition,
    next: nextPosition
  };
};

// 检查任职资格达标情况
export const checkQualificationStatus = (employee, position) => {
  const standard = positionStandards[position];
  if (!standard) return null;

  const results = {
    education: {
      required: standard.education,
      actual: employee.education,
      qualified: employee.education === standard.education
    },
    title: {
      required: standard.title,
      actual: employee.title,
      qualified: employee.title.includes(standard.title) || 
                (standard.title === '高级' && employee.title.includes('高级')) ||
                (standard.title === '中级' && (employee.title.includes('中级') || employee.title.includes('高级')))
    },
    performance: {
      required: standard.performance,
      actual: `近一年绩效: ${employee.performance.lastYear}, 当前季度: ${employee.performance.currentQuarter}`,
      qualified: employee.performance.lastYear === 'A' && employee.performance.currentQuarter === 'A'
    },
    experience: {
      required: standard.experience,
      actual: `${employee.workExperience}年工作经验`,
      qualified: employee.workExperience >= standard.workYears
    }
  };

  return results;
};
