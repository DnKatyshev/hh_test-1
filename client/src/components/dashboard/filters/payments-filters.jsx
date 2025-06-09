import * as React from 'react';
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


export function PaymentsFilters() {

  // Zod схема
  const validationSchema = z.object({
    id: z.string().regex(/^\d{9}$|^\d{10}$/, 'Payment ID должен иметь 9 или 10 цифр'),
    order_id: z.string().regex(/^\d{10}$/, 'Order ID должен иметь 10 цифр'),
    service: z.string().optional(),
    customer_email: z.string().email({ message: "Неправильный email-формат" }),
  });
  

  const inputsData = [
    {label: 'Payment ID', storeKey: 'id'},
    {label: 'Order ID', storeKey: 'order_id'},
    {label: 'Сервис', storeKey: 'service_code'},
    {label: 'Email плательщика', storeKey: 'customer_email'},
  ]

  const selectsData = [
    {
      label: "СТАТУС",
      options: [
        { value: null, label: "—" },
        { value: "paid", label: "Оплаченные" },
        { value: "wait", label: "Ожидание" },
        { value: "cancel", label: "Отменённые" },
        { value: "fail", label: "Ошибки" },
      ],
      storeKey: "status",
    },
    {
      label: "ВАЛЮТА",
      options: [
        { value: null, label: "—" },
        { value: "RUB", label: "RUB" },
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
        { value: "UAH", label: "UAH" },
      ],
      storeKey: "currency",
    },
  ];


  const {filters, setFilters, setLoading, loading} = useDataStore()
  const debouncedSetFilters = useDebouncedCallback((storeId, key, value) => {
    setFilters(storeId, { key, value });
  }, 300);

  const filtersHandler = (storeId, key, value) => {
    if (key === "order_id") {
      if (value.length < 10) {
        debouncedSetFilters(storeId, key, "")
      }
      
      // Если длина ровно 4, записываем значение
      if (value.length === 10) {
        debouncedSetFilters(storeId, key, value)
      }
    } else {
      setFilters(storeId, {key, value})
    }
  };
  console.log('PAYMENT FILTERS = ', filters)


  const [showAllFilters, setShowAllFilters] = React.useState(false);
  const toggleFilters = () => {
    setShowAllFilters((prev) => !prev);
  };

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
                        md: 6,
                        xs: 12,
                      }}
                      key={select.storeKey}
                    >
                      <Controller
                        control={control}
                        name={select.storeKey}
                        defaultValue={filters.payments?.[select.storeKey] ?? null}
                        render={({ field }) => (
                          <FormControl error={Boolean(errors[select.storeKey])} fullWidth>
                            <InputLabel>{select.label}</InputLabel>
                            <Select
                              {...field}
                              onChange={(event) => {
                                const value = event.target.value;
                                field.onChange(value);
                                filtersHandler("payments", select.storeKey, value);
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

                  <Collapse in={showAllFilters} timeout="auto" sx={{ width: '100%' }}>
                    <Grid container spacing={3}>
                    {
                    
                      inputsData.map((input) => (
                        <Grid
                          size={{
                            md: 6,
                            xs: 12,
                          }}
                          key={input.storeKey}
                        >
                          <Controller
                            control={control}
                            name={input.storeKey}
                            defaultValue={filters.payments?.[input.storeKey] ?? null}
                            render={({ field }) => (
                              <FormControl error={Boolean(errors[input.storeKey])} fullWidth>
                                <InputLabel>{input.label}</InputLabel>
                                <OutlinedInput
                                  {...field}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    field.onChange(value);
                                    filtersHandler("payments", input.storeKey, value);
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
                        <Grid
                          size={{
                            md: 6,
                            xs: 12,
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
                                  filtersHandler("payments", 'date_from', dayjs(data).format('YYYY-MM-DD'));
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
                            md: 6,
                            xs: 12,
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
                                  filtersHandler("payments", 'date_to', dayjs(data).format('YYYY-MM-DD'));
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
                  </Collapse>

              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button onClick={toggleFilters} variant="outlined">
            {showAllFilters ? 'Скрыть фильтры' : 'Больше фильтров'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
