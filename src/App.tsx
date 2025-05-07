import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getCurrentDay } from '@/lib/day';
import { Github } from 'lucide-react';
function App() {
  type DateObj = ReturnType<typeof getCurrentDay>;
  // const [currentDay, setCurrentDay] = useState(0);
  // const [yearProgress, setYearProgress] = useState(0);
  // const [daysInYear, setDaysInYear] = useState(0);
  const [data, setData] = useState<DateObj>(getCurrentDay());

  useEffect(() => {
    const calculateDays = () => {
      const data = getCurrentDay();
      // setCurrentDay(data.day);
      // setYearProgress(data.yearProgress);
      // setDaysInYear(data.daysInYear);
      setData(data);
    };

    calculateDays();
    
  }, []);

  const days = Array.from({ length: data.daysInYear }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-800">Time Grid - {new Date().toLocaleDateString()}</h1>
            <div className="text-sm text-neutral-500">
              <a href="https://github.com/zysam/time-grid" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>@zysam</span>
              </a>
            </div>
          </div>
          {/* year */}
          <div className="flex items-end space-x-4">
            <div className="text-4xl font-bold text-emerald-600">
              {data.yearProgress?.toFixed(1)}%
            </div>
            <div className="text-sm text-neutral-500">
              {data.day}/{data.daysInYear}
            </div>
          </div>
          {/* Month */}
          <div className="flex items-end space-x-4">
            <div className="text-2xl font-bold text-emerald-600">
              {data.monthProgress?.toFixed(1)}%
            </div>
            <div className="text-sm text-neutral-500">
              {data.dayOfMonth}/{data.daysInMonth}
            </div>
          </div>
          {/* Week */}
          <div className="flex items-end space-x-4">
            <div className="text-xl font-bold text-emerald-600">
              {data.weekProgress?.toFixed(1)}%
            </div>
            <div className="text-sm text-neutral-500">
              {data.dayOfWeek}/7, W{data.week}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-14 sm:grid-cols-21 md:grid-cols-21 gap-1 p-2 bg-white rounded-xl shadow-sm">
          {days.map((day) => (
            <div
              key={day}
              className={cn(
                'aspect-square rounded-md transition-colors',
                day < data.day && 'bg-neutral-200',
                day === data.day && 'bg-emerald-600 blink',
                // day === currentDay && isBlinking && 'bg-emerald-500',
                day > data.day && 'bg-white border border-neutral-100'
              )}
            />
          ))}
        </div>

        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neutral-200 rounded-md" />
            <span>Past</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-md" />
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white border border-neutral-100 rounded-md" />
            <span>Future</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;