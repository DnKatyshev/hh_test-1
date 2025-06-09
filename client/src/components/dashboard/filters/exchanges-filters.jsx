import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { dayjs } from '@/lib/dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Collapse } from '@mui/material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';

import useDataStore from '@/store/dataStore';
import { useDebouncedCallback } from '@/hooks/use-debounce';


export function ExchangesFilters() {

  // // Zod схема
  // const validationSchema = z.object({
  //   id: z.string().regex(/^\d{3,4}$/, 'ID должен иметь 3 или 4 цифры'),
  // });  
  
  
  const inputsData = [
    {label: 'ID', storeKey: 'id'},
  ]

  const selectsData = [
    {
      label: "СТАТУС",
      options: [
        { value: null, label: "—" },
        { value: "paid", label: "В процессе" },
        { value: "wait", label: "Модерация" },
        { value: "completed", label: "Выполнен" },
        { value: "cancel", label: "Отменён" },
      ],
      storeKey: "status",
    },
  ];


  const {filters, setFilters, setLoading, loading} = useDataStore()
  const debouncedSetFilters = useDebouncedCallback((storeId, key, value) => {
    setFilters(storeId, { key, value });
  }, 300);

  const filtersHandler = (storeId, key, value) => {
    debouncedSetFilters(storeId, key, value)
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {

  }

  console.log('EXCHANGES FILTERS', filters);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Grid container spacing={3}>


              {
                inputsData.map((input) => (
                  <Grid
                    size={{
                      xs: 4,
                    }}
                    key={input.storeKey}
                  >
                    <Controller
                      control={control}
                      name={input.storeKey}
                      defaultValue={filters.exchanges?.[input.storeKey] ?? null}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors[input.storeKey])} fullWidth>
                          <InputLabel>{input.label}</InputLabel>
                          <OutlinedInput
                            {...field}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(value);
                              filtersHandler("exchanges", input.storeKey, value);
                            }}
                            onBlur={() => clearErrors(input.storeKey)}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                ))
              }


              {
                selectsData.map((select) => (
                  <Grid
                    size={{
                      xs: 4,
                    }}
                    key={select.storeKey}
                  >
                    <Controller
                      control={control}
                      name={select.storeKey}
                      defaultValue={filters.exchanges?.[select.storeKey] ?? null}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors[select.storeKey])} fullWidth>
                          <InputLabel>{select.label}</InputLabel>
                          <Select
                            {...field}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(value);
                              filtersHandler("exchanges", select.storeKey, value);
                            }}
                          >
                            {select.options.map((option) => (
                              <Option key={option.value} value={option.value}>
                                {option.label}
                              </Option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                ))
              }


              <Grid
                size={{
                  xs: 4,
                }}
              >
                <Controller
                  control={control}
                  name="issueDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="MMM D, YYYY"
                      label="Дата от"
                      onChange={(data) => {
                        field.onChange(data);
                        filtersHandler("exchanges", 'date_from', dayjs(data).format('YYYY-MM-DD'));
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.issueDate),
                          fullWidth: true,
                          helperText: errors.issueDate?.message,
                        },
                      }}
                      value={dayjs(field.value)}
                    />
                  )}
                />
              </Grid>


              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
