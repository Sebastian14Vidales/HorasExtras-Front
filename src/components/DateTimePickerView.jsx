import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerView({onChangeDateTime}) {
  const handleDateTimeChange = (date) => {
    onChangeDateTime(date); // Llama a la función onChangeDateTime con la nueva fecha/hora seleccionada
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          className='bg-gray-100 border-none rounded-lg text-sm'
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          onChange={handleDateTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
