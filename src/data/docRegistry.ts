import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// Map each document ID to its lazily-loaded React component.
// Add new entries here when a document page is created.
export const DOC_REGISTRY: Record<string, LazyExoticComponent<ComponentType>> = {
  'MC-01':  lazy(() => import('../pages/docs/MetasCorporativas')),
  'MIT-02': lazy(() => import('../pages/docs/MetasTI')),
  'CG-03':  lazy(() => import('../pages/docs/CascadaMetas')),
  'ME-04':  lazy(() => import('../pages/docs/MapaEstrategico')),
  'CN-05':  lazy(() => import('../pages/docs/CasoNegocio')),
  'CS-06':  lazy(() => import('../pages/docs/CedulaServicio')),
  'IA-07':  lazy(() => import('../pages/docs/InventarioActivos')),
  'MR-08':  lazy(() => import('../pages/docs/DocPending')),
  'BT-09':  lazy(() => import('../pages/docs/DocPending')),
  'BO-10':  lazy(() => import('../pages/docs/DocPending')),
  'PC-11':  lazy(() => import('../pages/docs/DocPending')),
};
