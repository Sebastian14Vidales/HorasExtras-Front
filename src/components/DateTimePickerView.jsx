import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from "dayjs"; // Importa la librería Day.js
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js"

export default function DateTimePickerView({dateTime, onChangeDateTime}) {
  dayjs.extend(utc); 
  dayjs.extend(timezone);

  const handleDateTimeChange = (date) => {
    onChangeDateTime(date); // Llama a la función onChangeDateTime con la nueva fecha/hora seleccionada
  };

  // Asegúrate de que dateTime sea una instancia válida de Day.js
  const validDateTime = dateTime ? dayjs(dateTime) : null;

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
          value={validDateTime}
          onChange={handleDateTimeChange} // Maneja el cambio de fecha/hora y actualiza el estado dateTime
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
