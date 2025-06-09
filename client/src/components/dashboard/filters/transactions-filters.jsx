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

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';


import useDataStore from '@/store/dataStore';

import { useDebouncedCallback } from '@/hooks/use-debounce';


export function TransactionsFilters() {

  const inputsData = [
    {label: 'ID', storeKey: 'id'},
  ]

  const selectsData = [
    {
      label: "Тип",
      options: [
        { value: null, label: "—" },
        { value: "in", label: "in" },
        { value: "out", label: "out" },
        { value: "in_transfer_account", label: "in_transfer_account" },
        { value: "out_transfer_account", label: "out_transfer_account" },
        { value: "in_system", label: "in_system" },
        { value: "out_system", label: "out_system" },
        { value: "in_system_rolling", label: "in_system_rolling" },
        { value: "out_system_rolling", label: "out_system_rolling" },
      ],
      storeKey: "type",
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
                      xs: 3,
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

                              filtersHandler("transactions", input.storeKey, value);
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
                      xs: 3,
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
                              filtersHandler("transactions", select.storeKey, value);
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
                    xs: 3,
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
                          filtersHandler("transactions", 'date_from', dayjs(data).format('YYYY-MM-DD'));
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
                <Grid
                  size={{
                    xs: 3,
                  }}
                >
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="MMM D, YYYY"
                        label="Дата до"
                        onChange={(data) => {
                          field.onChange(data);
                          filtersHandler("transactions", 'date_to', dayjs(data).format('YYYY-MM-DD'));
                        }}
                        slotProps={{
                          textField: {
                            error: Boolean(errors.dueDate),
                            fullWidth: true,
                            helperText: errors.dueDate?.message,
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
