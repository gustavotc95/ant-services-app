import React, {InputHTMLAttributes, LegacyRef} from 'react';
import {FieldErrors} from 'react-hook-form';
import _ from 'lodash/fp';

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  id?: string;
  className?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  erros?: FieldErrors;
  inputMaxLength?: number;
  mask?: (value: string) => string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  className = '',
  id,
  inputRef,
  erros,
  inputMaxLength = 1000,
  mask = (value: string) => value,
}: IFormInput) {
  return (
    <>
      <input
        name={name}
        className={`form-input ${className}`}
        type={type}
        placeholder={placeholder}
        id={id}
        ref={inputRef}
        maxLength={Number(inputMaxLength)}
        onChange={e => (e.target.value = `${mask(e.target.value)}`)}
      />
      {_.get(`${name}['type']`, erros) === 'required' && (
        <p className="input-error">Este campo é obrigatório.</p>
      )}
      {_.get(`${name}['type']`, erros) === 'maxLength' && (
        <p className="input-error">
          O campo não pode ter mais de {inputMaxLength} caracteres.
        </p>
      )}
      {_.get(`${name}['type']`, erros) === 'validate' && (
        <p className="input-error">Valor inserido inválido</p>
      )}
      {_.get(`${name}['type']`, erros) === 'pattern' && (
          <p className="input-error">Caractere inválido.</p>
        ) &&
        !erros.email}
      {_.get(`${name}['type']`, erros) === 'pattern' && erros.email && (
        <p className="input-error">{erros.email.message}</p>
      )}
    </>
  );
}
