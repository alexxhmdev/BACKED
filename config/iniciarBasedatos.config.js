import sequelize from './baseDatos.config.js';

export const inicializarBaseDatos = async () => {
  try {
    await sequelize.sync({ alter: true }); //Para modificaciones true
    console.log('La base de datos y las tablas han sido sincronizadas.');

    // Crear los triggers después de que las tablas estén listas
    await sequelize.query(`

      -- TRIGGERS PARA INSERTAR INVERSION CALCULADA DE CARGOS FIJOS

      DROP TRIGGER IF EXISTS trigger_before_insert_inversion_cf ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_inversion_cf();

      CREATE OR REPLACE FUNCTION before_insert_inversion_cf()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.ha_horas_efectivas_trabajo_anual, 0) = 0 THEN
              RETURN NEW; -- No hacer nada si la división es inválida
          END IF;

          -- Calcular el valor y asignarlo al campo antes de la inserción o actualización
          NEW.inversion_calculada_cf := 
              (COALESCE(NEW.va_valor_adquisicion, 0) + COALESCE(NEW.vr_valor_rescate, 0)) / 
              (2 * COALESCE(NEW.ha_horas_efectivas_trabajo_anual, 1)) * COALESCE(NEW.ia_interes_anual, 0);

          -- Retorna el nuevo registro modificado antes de ser insertado/actualizado en la tabla_costos
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;


      CREATE TRIGGER trigger_before_insert_inversion_cf
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_inversion_cf();
        

      -- TRIGGERS PARA INSERTAR SEGUROS CALCULADOS DE CARGOS FIJOS

      DROP TRIGGER IF EXISTS trigger_before_insert_seguros_cf ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_seguros_cf();

      CREATE OR REPLACE FUNCTION before_insert_seguros_cf()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.ha_horas_efectivas_trabajo_anual, 0) = 0 THEN
              RETURN NEW; -- No hacer nada si la división es inválida
          END IF;

          -- Calcular seguros_cf y asignarlo al campo seguros_calculada_cf
          NEW.seguros_calculados_cf := 
              (COALESCE(NEW.va_valor_adquisicion, 0) + COALESCE(NEW.vr_valor_rescate, 0)) / 
              (2 * COALESCE(NEW.ha_horas_efectivas_trabajo_anual, 1)) * COALESCE(NEW.s_prima_anual, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_seguros_cf
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_seguros_cf();


      -- TRIGGERS PARA INSERTAR ALMACENAJE CALCULADOS DE CARGOS FIJOS

      CREATE OR REPLACE FUNCTION before_insert_almacenaje_cf()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular almacenaje_cf y asignarlo al campo almacenaje_calculado_cf
          NEW.almacenaje_calculado_cf := 
              COALESCE(NEW.ka_calculo_experimental, 0) * COALESCE(NEW.d_depreciacion, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_almacenaje_cf
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_almacenaje_cf();


      -- TRIGGERS PARA INSERTAR MANTENIMIENTO CALCULADOS DE CARGOS FIJOS

      CREATE OR REPLACE FUNCTION before_insert_mantenimiento_cf()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.ve_horas_vida, 0) = 0 THEN
              RETURN NEW; -- No hacer nada si la división es inválida
          END IF;

          -- Calcular mantenimiento_cf y asignarlo al campo mantenimiento_calculado_cf
          NEW.mantenimiento_calculado_cf := 
              ABS(COALESCE(NEW.q_coeficiente_experimental, 0) * 
                  (COALESCE(NEW.va_valor_adquisicion, 0) - COALESCE(NEW.vr_valor_rescate, 0)) / 
                  COALESCE(NEW.ve_horas_vida, 1));

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;


      CREATE TRIGGER trigger_before_insert_mantenimiento_cf
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_mantenimiento_cf();


      -- TRIGGERS PARA INSERTAR TOTAL DE CARGOS FIJOS CALCULADOS DE CARGOS FIJOS

      DROP TRIGGER IF EXISTS trigger_before_insert_total_cargos_fijos ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_total_cargos_fijos();

      CREATE OR REPLACE FUNCTION before_insert_total_cargos_fijos()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular el total de cargos fijos y asignarlo a la columna total_cargos_fijos
          NEW.total_cargos_fijos := 
              COALESCE(NEW.depreciacion_calculada_cf, 0) +
              COALESCE(NEW.inversion_calculada_cf, 0) +
              COALESCE(NEW.seguros_calculados_cf, 0) +
              COALESCE(NEW.almacenaje_calculado_cf, 0) +
              COALESCE(NEW.mantenimiento_calculado_cf, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_total_cargos_fijos
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_total_cargos_fijos();




      -- TRIGGERS PARA INSERTAR EL COSTO COMBUSTIBLE DE CONSUMOS

      DROP TRIGGER IF EXISTS trigger_before_insert_costo_combustible ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_costo_combustible();

      CREATE OR REPLACE FUNCTION before_insert_costo_combustible()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular costo_combustible y asignarlo a la columna costo_combustible_calculado
          NEW.combustible_consumo_c := 
              COALESCE(NEW.c_combustible_hora_trabajo, 0) * COALESCE(NEW.pc_precio_combustible, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_costo_combustible
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_costo_combustible();



      -- TRIGGERS PARA INSERTAR EL COSTO LLANTAS DE CONSUMOS

      DROP TRIGGER IF EXISTS trigger_before_insert_costo_llantas ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_costo_llantas();

      CREATE OR REPLACE FUNCTION before_insert_costo_llantas()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.hv_vida_economica_llantas, 0) = 0 THEN
              NEW.llantas_consumo_c := 0;
          ELSE
              -- Calcular costo_llantas y asignarlo a la columna costo_llantas_calculado
              NEW.llantas_consumo_c := 
                  COALESCE(NEW.vll_valor_llantas, 0) * COALESCE(NEW.cll_cantidad_llantas, 0) / 
                  COALESCE(NULLIF(NEW.hv_vida_economica_llantas, 0), 1);
          END IF;

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;


      CREATE TRIGGER trigger_before_insert_costo_llantas
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_costo_llantas();



      -- TRIGGERS PARA INSERTAR EL COSTO CADENAS DE CONSUMOS

      CREATE OR REPLACE FUNCTION before_insert_costo_cadenas()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.hc_vida_economica_cadenas, 0) = 0 THEN
              NEW.cadenas_consumo_c := 0;
          ELSE
              -- Calcular costo_cadenas y asignarlo a la columna costo_cadenas_calculado
              NEW.cadenas_consumo_c := 
                  COALESCE(NEW.vc_valor_cadenas, 0) * COALESCE(NEW.cc_cantidad_cadenas, 0) / 
                  COALESCE(NULLIF(NEW.hc_vida_economica_cadenas, 0), 1);
          END IF;

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_costo_cadenas
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_costo_cadenas();


      -- TRIGGERS PARA INSERTAR EL COSTO FILTROS DE CONSUMOS

      CREATE OR REPLACE FUNCTION before_insert_costo_filtros()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular costo_filtros y asignarlo a la columna costo_filtros_calculado
          NEW.filtros_consumo_c := COALESCE(NEW.fi_precio_filtro_hora, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_costo_filtros
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_costo_filtros();



      -- TRIGGERS PARA INSERTAR EL TOTAL DE CONSUMOS DE CONSUMOS

      DROP TRIGGER IF EXISTS trigger_before_insert_total_consumos ON tabla_costos;
      DROP FUNCTION IF EXISTS before_insert_total_consumos();

      CREATE OR REPLACE FUNCTION before_insert_total_consumos()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero en los cálculos
          NEW.total_consumos := 
              COALESCE(NEW.c_combustible_hora_trabajo * NEW.pc_precio_combustible, 0) + 
              COALESCE((NEW.vll_valor_llantas * NEW.cll_cantidad_llantas) / NULLIF(NEW.hv_vida_economica_llantas, 0), 0) + 
              COALESCE((NEW.vc_valor_cadenas * NEW.cc_cantidad_cadenas) / NULLIF(NEW.hc_vida_economica_cadenas, 0), 0) + 
              COALESCE(NEW.fi_precio_filtro_hora, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_total_consumos
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_total_consumos();


        


      -- TRIGGERS PARA INSERTAR EL ACEITE DE MOTOR DE LUBRICANTES

      CREATE OR REPLACE FUNCTION before_insert_aceite_motor()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular aceite_motor y asignarlo a la columna aceite_motor_calculado
          NEW.aceite_de_motor_calculada_lubricantes_l := 
              COALESCE(NEW.a_aceite_horas_trabajo, 0) * COALESCE(NEW.pi_precio_aceite, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_aceite_motor
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_aceite_motor();



      -- TRIGGERS PARA INSERTAR EL ACEITE DE HIDRAULICO DE LUBRICANTES

      CREATE OR REPLACE FUNCTION before_insert_aceite_hidraulico()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular aceite_hidraulico y asignarlo a la columna aceite_hidraulico_calculado
          NEW.aceite_hidrahulico_calculada_lubricantes_l := 
              COALESCE(NEW.cah_cantidad_aceite_hidraulico, 0) * COALESCE(NEW.pah_precio_aceite_hidraulico, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_aceite_hidraulico
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_aceite_hidraulico();



      -- TRIGGERS PARA INSERTAR EL ACEITE DE MANDOS FINALES DE LUBRICANTES

      CREATE OR REPLACE FUNCTION before_insert_aceite_mandos_finales()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular aceite_mandos_finales y asignarlo a la columna aceite_mandos_finales_calculado
          NEW.aceite_mandos_finales_calculada_lubricantes_l := 
              COALESCE(NEW.cmf_cantidad_mando_final, 0) * COALESCE(NEW.pmf_precio_aceite_mando_final, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_aceite_mandos_finales
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_aceite_mandos_finales();



      -- TRIGGERS PARA INSERTAR ENGRASADOS DE LUBRICANTES

      CREATE OR REPLACE FUNCTION before_insert_engrasados()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular engrasados y asignarlo a la columna engrasados_calculado
          NEW.engrasados_calculada_lubricantes_l := 
              COALESCE(NEW.cg_cantidad_grasa, 0) * COALESCE(NEW.pg_precio_grasa, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_engrasados
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_engrasados();



      -- TRIGGERS PARA INSERTAR TOTAL DE LUBRICANTES DE LUBRICANTES

      CREATE OR REPLACE FUNCTION before_insert_total_lubricantes()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Calcular total_lubricantes y asignarlo a la columna total_lubricantes_calculado
          NEW.total_lubricantes := 
              COALESCE(NEW.a_aceite_horas_trabajo * NEW.pi_precio_aceite, 0) + 
              COALESCE(NEW.cah_cantidad_aceite_hidraulico * NEW.pah_precio_aceite_hidraulico, 0) + 
              COALESCE(NEW.cmf_cantidad_mando_final * NEW.pmf_precio_aceite_mando_final, 0) + 
              COALESCE(NEW.cg_cantidad_grasa * NEW.pg_precio_grasa, 0);

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_total_lubricantes
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_total_lubricantes();






      -- TRIGGERS PARA INSERTAR TOTAL OPERACIONES DE OPERACIONES

      CREATE OR REPLACE FUNCTION before_insert_total_operacion()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Evitar división por cero
          IF COALESCE(NEW.h_horas_trabajadas_maquina, 0) = 0 THEN
              NEW.total_operacion := 0;
          ELSE
              -- Calcular total_operacion y asignarlo a la columna total_operacion_calculado
              NEW.total_operacion := 
                  (COALESCE(NEW.sa_salario_operacional, 0) * COALESCE(NEW.to_turno_operacion, 0)) / 
                  COALESCE(NULLIF(NEW.h_horas_trabajadas_maquina, 0), 1);
          END IF;

          -- Retorna el nuevo registro con el campo calculado antes de insertarlo o actualizarlo
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_before_insert_total_operacion
      BEFORE INSERT OR UPDATE ON tabla_costos
      FOR EACH ROW 
      EXECUTE FUNCTION before_insert_total_operacion();

      

    `);

    console.log("✅ Triggers creados correctamente.")

  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};
