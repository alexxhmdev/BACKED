import express from 'express';
import pkg from 'pg';
import { config } from '../../../config/config.js';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD } = config;

const { Pool } = pkg; 

const router = express.Router();

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});

router.get('/', async (req, res) => {
  try {
    // Ejecutar las funciones de cargos fijos
    const valor_rescate = await pool.query('SELECT * FROM obtener_valor_rescate()');
    const prima_anual = await pool.query('SELECT * FROM obtener_prima_anual()');
    const depreciacion_cf = await pool.query('SELECT * FROM obtener_depreciacion_cf()');
    const inversion_cf = await pool.query('SELECT * FROM obtener_inversion_cf()');
    const seguros_cf = await pool.query('SELECT * FROM obtener_seguros_cf()');
    const almacenaje_cf = await pool.query('SELECT * FROM obtener_almacenaje_cf()');
    const mantenimiento_cf = await pool.query('SELECT * FROM obtener_mantenimiento_cf()');
    const total_cargos_fijos = await pool.query('SELECT * FROM obtener_total_cargos_fijos()');

    // Ejecutar las funciones de combustibles
    const costo_combustible = await pool.query('SELECT * FROM obtener_costo_combustible()');
    const costo_llantas = await pool.query('SELECT * FROM obtener_costo_llantas()');
    const costo_cadenas = await pool.query('SELECT * FROM obtener_costo_cadenas()');
    const costo_filtros = await pool.query('SELECT * FROM obtener_costo_filtros()');
    const total_consumos = await pool.query('SELECT * FROM obtener_total_consumos()');

    // Ejecutar las funciones de lubricantes
    const aceite_motor = await pool.query('SELECT * FROM obtener_aceite_motor_lubricantes()');
    const aceite_hidraulico = await pool.query('SELECT * FROM obtener_aceite_hidraulico_lubricantes()');
    const aceite_mandos_finales = await pool.query('SELECT * FROM obtener_aceite_mandos_finales_lubricantes()');
    const engrasados = await pool.query('SELECT * FROM obtener_engrasados_lubricantes()');
    const total_lubricantes = await pool.query('SELECT * FROM obtener_total_lubricantes()');

    // Ejecutar las funciones de operaciones
    const total_operacion = await pool.query('SELECT * FROM calcular_total_operacion()');

    // Ejecutar las funciones de costo horario
    const costo_horario = await pool.query('SELECT obtener_costo_horario() AS costo_horario');

    // Combinar los resultados
    const respuesta = {
      cargos_fijos: valor_rescate.rows.map((row, index) => ({
        valor_rescate: row.valor_rescate || 0,
        prima_anual: prima_anual.rows[index]?.prima_anual || 0,
        depreciacion_cf: depreciacion_cf.rows[index]?.depreciacion_cf || 0,
        inversion_cf: inversion_cf.rows[index]?.inversion_cf || 0,
        seguros_cf: seguros_cf.rows[index]?.seguros_cf || 0,
        almacenaje_cf: almacenaje_cf.rows[index]?.almacenaje_cf || 0,
        mantenimiento_cf: mantenimiento_cf.rows[index]?.mantenimiento_cf || 0,
        total_cargos_fijos: total_cargos_fijos.rows[index]?.total_cargos_fijos || 0,
      })),

      combustibles: costo_combustible.rows.map((row, index) => ({
        costo_combustible: row.costo_combustible || 0,
        costo_llantas: costo_llantas.rows[index]?.costo_llantas || 0,
        costo_cadenas: costo_cadenas.rows[index]?.costo_cadenas || 0,
        costo_filtros: costo_filtros.rows[index]?.costo_filtros || 0,
        total_consumos: total_consumos.rows[index]?.total_consumos || 0,
      })),

      lubricantes: aceite_motor.rows.map((row, index) => ({
        aceite_motor: row.aceite_motor || 0,
        aceite_hidraulico: aceite_hidraulico.rows[index]?.aceite_hidraulico || 0,
        aceite_mandos_finales: aceite_mandos_finales.rows[index]?.aceite_mandos_finales || 0,
        engrasados: engrasados.rows[index]?.engrasados || 0,
        total_lubricantes: total_lubricantes.rows[index]?.total_lubricantes || 0,
      })),

      operaciones: total_operacion.rows.map(row => ({
        total_operacion: row.total_operacion || 0,
      })),

      costoHorario: costo_horario.rows.map(row => ({
        costo_horario: row.costo_horario || 0,
      }))
    
    };

    // Enviar la respuesta
    res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

export const gastosRoutes = router;
