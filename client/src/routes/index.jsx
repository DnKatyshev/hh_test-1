import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from '@/components/dashboard/layout/layout';
import {Page as Test} from '@/pages/test/Test'


export const mainRoutes = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [

      {
        index: true,
        element: <Test/>
      },

    ],
  },
];

