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


export function AccountsFilters() {

  // Zod схема
  const validationSchema = z.object({
    uuid: z.string().regex(/^.{36}$/, 'UUID должен иметь 36 символов'),
  });

  const inputsData = [
    {label: 'UUID', storeKey: 'uuid'},
  ]

  const selectsData = [
    {
      label: "ВАЛЮТА",
      options: [
        { value: null, label: "—" },
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
        { value: "RUB", label: "RUB" },
      ],
      storeKey: "currency",
    },
  ];


  const {filters, setFilters, setLoading, loading} = useDataStore()
  const debouncedSetFilters = useDebouncedCallback((storeId, key, value) => {
    setFilters(storeId, { key, value });
  }, 300);

  const filtersHandler = (storeId, key, value) => {
    if (key === "uuid") {
      if (value.length < 36) {
        debouncedSetFilters(storeId, key, "")
      }
      
      // Если длина ровно 4, записываем значение
      if (value.length === 36) {
        debouncedSetFilters(storeId, key, value)
      }
    } else {
      setFilters(storeId, {key, value})
    }
  };
  
  console.log('LOADING', loading);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });
  const onSubmit = () => {

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Grid container spacing={3}>

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
                      defaultValue={filters.accounts?.[select.storeKey] ?? null}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors[select.storeKey])} fullWidth>
                          <InputLabel>{select.label}</InputLabel>
                          <Select
                            {...field}
                            onChange={(event) => {
                              field.onChange(event);
                              filtersHandler("accounts", select.storeKey, event.target.value); // Обновляем стор
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
                      defaultValue={filters.accounts?.[input.storeKey] ?? null}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors[input.storeKey])} fullWidth>
                          <InputLabel>{input.label}</InputLabel>
                          <OutlinedInput
                            {...field}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(value);

                              // Логика вызова setPaymentFilters
                              filtersHandler("accounts", input.storeKey, value);
                            }}
                            onBlur={() => clearErrors(input.storeKey)}
                          />

                          {errors[input.storeKey] && (
                            <FormHelperText>
                              {errors[input.storeKey]?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
                ))
              }

              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
