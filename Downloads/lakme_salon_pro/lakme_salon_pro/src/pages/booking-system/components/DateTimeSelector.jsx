import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const DateTimeSelector = ({ selectedDate, selectedTime, onDateSelect, onTimeSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());

    const days = [];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      
      const isCurrentMonth = date?.getMonth() === month;
      const isPast = date < today;
      const isToday = date?.getTime() === today?.getTime();
      const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
      
      // Mock availability (some dates unavailable)
      const unavailableDates = [5, 12, 19, 26];
      const isUnavailable = unavailableDates?.includes(date?.getDate()) && isCurrentMonth;

      days?.push({
        date,
        day: date?.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected,
        isUnavailable: isPast || isUnavailable
      });
    }

    return days;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 21; // 9 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
        const displayTime = new Date(2024, 0, 1, hour, minute)?.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        // Mock popular times and availability
        const popularTimes = ['10:00', '14:00', '16:00', '18:00'];
        const unavailableTimes = ['11:30', '13:00', '15:30', '19:00'];
        
        slots?.push({
          time,
          displayTime,
          isPopular: popularTimes?.includes(time),
          isUnavailable: unavailableTimes?.includes(time),
          isSelected: selectedTime === time
        });
      }
    }

    return slots;
  };

  const calendarDays = generateCalendarDays();
  const timeSlots = generateTimeSlots();

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Select Date
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateMonth(-1)}
            />
            <span className="font-medium text-foreground min-w-[120px] text-center">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateMonth(1)}
            />
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames?.map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays?.map((day, index) => (
            <button
              key={index}
              onClick={() => !day?.isUnavailable && onDateSelect(day?.date)}
              disabled={day?.isUnavailable}
              className={`
                aspect-square p-2 text-sm rounded-md transition-smooth relative
                ${!day?.isCurrentMonth 
                  ? 'text-muted-foreground/50' 
                  : day?.isUnavailable
                  ? 'text-muted-foreground/50 cursor-not-allowed'
                  : day?.isSelected
                  ? 'bg-primary text-primary-foreground'
                  : day?.isToday
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-muted'
                }
              `}
            >
              {day?.day}
              {day?.isToday && !day?.isSelected && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
            Select Time
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {timeSlots?.map((slot) => (
              <button
                key={slot?.time}
                onClick={() => !slot?.isUnavailable && onTimeSelect(slot?.time)}
                disabled={slot?.isUnavailable}
                className={`
                  relative p-3 text-sm font-medium rounded-md transition-smooth
                  ${slot?.isUnavailable
                    ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    : slot?.isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border text-foreground hover:bg-muted hover:border-primary/50'
                  }
                `}
              >
                {slot?.displayTime}
                {slot?.isPopular && !slot?.isUnavailable && !slot?.isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Popular times</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted rounded-full" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;