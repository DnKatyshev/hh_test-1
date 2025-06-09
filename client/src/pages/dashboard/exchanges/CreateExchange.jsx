import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  Button,
  Link
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { config } from '@/config';
import { paths } from '@/paths';

const metadata = { title: `${config.site.name} Create Exchange` };

export function Page() {
  // Zod схема
  const validationSchema = z.object({
    from_account: z.string().min(1, 'Выберите счёт'),
    from_amount: z.string().min(1, 'Введите сумму'),
    to_account: z.string().min(1, 'Выберите счёт'),
  });


  const [createFilters, setCreateFilters] = useState({});
  const filtersHandler = (key, value) => {
    setCreateFilters((prev) => ({ ...prev, [key]: value }));
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
        from_account: '',
        from_amount: '',
        to_account: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  const fakeOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  console.log('ERRORS = ', errors);


  return (
    <Box
      sx={{
        p: '40px',
        width: 'var(--Content-width)',
      }}
    >
        <Helmet>
        <title>{metadata.title}</title>
        </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" sx={{ marginBottom: '40px' }}>Создать обмен</Typography>
        <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px'}}>
            <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: "20px", borderRadius: "12px", border: "1px solid #E0E0E0", backgroundColor: "#fff", boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)" }}>
            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Обмен</Typography>

            {/* Select Field */}
            <Controller
                control={control}
                name="from_account"
                render={({ field }) => (
                <FormControl error={Boolean(errors['from_account'])} fullWidth>
                    <InputLabel>Списать со счёта</InputLabel>
                    <Select
                    {...field}
                    onChange={(event) => {
                        field.onChange(event);
                        filtersHandler('from_account', event.target.value);
                    }}
                    label="Списать со счёта"
                    >
                    {fakeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </Select>
                    {errors['from_account'] && (
                    <FormHelperText>{errors['from_account']?.message}</FormHelperText>
                    )}
                </FormControl>
                )}
            />

            {/* Input Field */}
            <Controller
                control={control}
                name="from_amount"
                render={({ field }) => (
                <FormControl error={Boolean(errors['from_amount'])} fullWidth>
                    <InputLabel htmlFor="from-amount">Сумма</InputLabel>
                    <OutlinedInput
                    {...field}
                    id="from-amount"
                    onChange={(event) => {
                        const value = event.target.value;
                        field.onChange(value);
                        filtersHandler('from_amount', value);
                    }}
                    label="Сумма"
                    />
                    {errors['from_amount'] && (
                    <FormHelperText>{errors['from_amount']?.message}</FormHelperText>
                    )}
                </FormControl>
                )}
            />
            </Stack>

            <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: "20px", borderRadius: "12px", border: "1px solid #E0E0E0", backgroundColor: "#fff", boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)" }}>
            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Зачислить на счёт</Typography>

            {/* Select Field */}
            <Controller
                control={control}
                name="to_account"
                render={({ field }) => (
                <FormControl error={Boolean(errors['to_account'])} fullWidth>
                    <InputLabel>Зачислить</InputLabel>
                    <Select
                    {...field}
                    onChange={(event) => {
                        field.onChange(event);
                        filtersHandler('to_account', event.target.value);
                    }}
                    label="Списать со счёта"
                    >
                    {fakeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </Select>
                    {errors['to_account'] && (
                    <FormHelperText>{errors['to_account']?.message}</FormHelperText>
                    )}
                </FormControl>
                )}
            />
            </Stack>
        </Stack>

        <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', columnGap: '20px', marginTop: '40px'  }}>
            <Link href="/" sx={{ textDecoration: 'none', color: '#797979'}}>Отмена</Link>
            <Button type="submit" sx={{ color: '#fff', backgroundColor: '#000410', padding: '8px 24px', fontSize: '18px', borderRadius: '10px', fontWeight: 500, '&:hover': {backgroundColor: '#001626'} }}>Создать и добавить другой</Button>
            <Button type="submit" sx={{ color: '#fff', backgroundColor: '#000410', padding: '8px 24px', fontSize: '18px', borderRadius: '10px', fontWeight: 500, '&:hover': {backgroundColor: '#001626'} }}>Отправить</Button>
        </Stack>
      </form>
    </Box>
  );
}
