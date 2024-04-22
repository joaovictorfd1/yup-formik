import React, { useState } from 'react';
import { Tipografia } from "../../componentes/Tipografia/Tipografia";
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto";
import { ListaSupensa } from "../../componentes/ListaSuspensa/ListaSuspensa";
import { Col, Row } from "react-grid-system";
import { Botao } from "../../componentes/Botao/Botao";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const estadosBrasileiros = [
    { "text": "Acre", "value": "AC" },
    { "text": "Alagoas", "value": "AL" },
    { "text": "Amapá", "value": "AP" },
    { "text": "Amazonas", "value": "AM" },
    { "text": "Bahia", "value": "BA" },
    { "text": "Ceará", "value": "CE" },
    { "text": "Distrito Federal", "value": "DF" },
    { "text": "Espírito Santo", "value": "ES" },
    { "text": "Goiás", "value": "GO" },
    { "text": "Maranhão", "value": "MA" },
    { "text": "Mato Grosso", "value": "MT" },
    { "text": "Mato Grosso do Sul", "value": "MS" },
    { "text": "Minas Gerais", "value": "MG" },
    { "text": "Pará", "value": "PA" },
    { "text": "Paraíba", "value": "PB" },
    { "text": "Paraná", "value": "PR" },
    { "text": "Pernambuco", "value": "PE" },
    { "text": "Piauí", "value": "PI" },
    { "text": "Rio de Janeiro", "value": "RJ" },
    { "text": "Rio Grande do Norte", "value": "RN" },
    { "text": "Rio Grande do Sul", "value": "RS" },
    { "text": "Rondônia", "value": "RO" },
    { "text": "Roraima", "value": "RR" },
    { "text": "Santa Catarina", "value": "SC" },
    { "text": "São Paulo", "value": "SP" },
    { "text": "Sergipe", "value": "SE" },
    { "text": "Tocantins", "value": "TO" }
];

const formatarTelefone = (valor) => {
    if (!valor) return
    
    const telefone = valor.replace(/\D/g, "")
      
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`
  }

const schema = Yup.object().shape({
    nome: Yup.string().trim().lowercase().required('Campo obrigatório').min(2, 'Digite seu nome completo'),
    cidade: Yup.string().titlecase().required('Campo obrigatório').max(58, 'Digite uma cidade válida'),
    estado: Yup.string().required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório').matches(/^\d{11}$/, 'Número de telefone inválido').transform(formatarTelefone),
    email: Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório'),
    confirmarSenha: Yup.string().required('Campo obrigatório').oneOf([Yup.ref('senha'), null], 'As senhas não conferem'),
    termos: Yup.boolean().oneOf([true], 'Você deve aceitar os termos'),
    nascimento: Yup.date().required('Campo obrigatório').max(new Date(), 'Digite uma data válida'),
});

const DadosPessoais = () => {
    return (
        <Formik
            initialValues={{
                nome: '',
                estado: '',
                cidade: '',
                telefone: '',
                email: '',
                senha: '',
                confirmarSenha: '',
                termos: false,
                nascimento: '',
            }}
            validationSchema={schema}
            onSubmit={(values) => {
                console.log('values', values);
            }}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <div style={{ textAlign: 'center' }}>
                        <Tipografia variante="h1" componente="h1">
                            Crie seu cadastro
                        </Tipografia>
                        <Tipografia variante="body" componente="body">
                            Crie seu perfil gratuitamente para começar a trabalhar com os melhores freelancers. Em seguida, você poderá dar mais detalhes sobre suas demandas e sobre sua forma de trabalho.
                        </Tipografia>
                    </div>
                    <Row>
                        <Col>
                            <CampoTexto
                                titulo="Nome completo"
                                name='nome'
                                tipo='text'
                            />
                        </Col>
                        <Col>
                            <CampoTexto titulo='Data de nascimento' name='nascimento' type='date' />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={4}>
                            <ListaSupensa
                                titulo="Estado"
                                opcoes={estadosBrasileiros}
                                name='estado'
                            />
                        </Col>
                        <Col lg={8} md={8} sm={8}>
                            <CampoTexto
                                titulo="Cidade"
                                name='cidade'
                                tipo='text'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <CampoTexto
                                titulo="E-mail"
                                tipo='email'
                                name='email'
                            />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <CampoTexto
                                titulo="Telefone"
                                tipo='tel'
                                name='telefone'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <CampoTexto
                                titulo="Senha"
                                tipo='password'
                                name='senha'
                            />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <CampoTexto
                                titulo="Confirme sua senha"
                                tipo='password'
                                name='confirmarSenha'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <label>
                            <Field type='checkbox' name='termos' />
                            Aceito os termos e condições
                        </label>
                    </Row>
                    {formik.errors.termos ? (
                        <div style={{ color: 'red', marginTop: '4px' }}>
                            {formik.errors.termos}
                        </div>
                    ) : null}
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <Link to="/cadastro/interesses">
                                <Botao variante="secundaria">
                                    Anterior
                                </Botao>
                            </Link>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <div style={{ textAlign: 'right' }}>
                                {/* <Link to='/cadastro/concluido'> */}
                                <Botao>
                                    Próxima
                                </Botao>
                                {/* </Link> */}
                            </div>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default DadosPessoais;