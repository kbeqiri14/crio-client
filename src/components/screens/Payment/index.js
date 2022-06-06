import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { DatePicker } from 'antd';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getPaymentMethod } from '@app/graphql/queries/payment-method.query';
import Confirmation from '@shared/Confirmation';
import { Col, Input, Row, Text, Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import Footer from './Footer';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  > div {
    max-width: 804px;
  }
`;

const Payment = () => {
  const { user } = useLoggedInUser();
  const [confirmationVisible, setConfirmationVisible] = useState();
  const { control, watch, handleSubmit } = useForm();

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const dob = watch('dob');
  const city = watch('city');
  const state = watch('state');
  const postalCode = watch('postalCode');
  const address = watch('address');
  const bankAccount = watch('bankAccount');
  const bankRouting = watch('bankRouting');

  const hideModal = useCallback(() => setConfirmationVisible(false), []);
  const hideConfirmation = useCallback(() => setConfirmationVisible(false), []);
  const goExplorePage = useCallback(() => history.push('/'), []);

  const { data, loading } = useQuery(getPaymentMethod);
  const paymentMethod = useMemo(() => data?.getPaymentMethod, [data?.getPaymentMethod]);

  useEffect(() => {
    if (user.id && !user.isCreator) {
      history.push('/');
    }
  }, [user.id, user.isCreator]);

  const updatedData = useMemo(
    () => ({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim(),
      dob: dob?.trim(),
      city: city?.trim(),
      state: state?.trim(),
      postalCode: postalCode?.trim(),
      address: address?.trim(),
      bankAccount: bankAccount?.trim(),
      bankRouting: bankRouting?.trim(),
    }),
    [firstName, lastName, email, dob, city, state, postalCode, address, bankAccount, bankRouting],
  );
  const disabled = useMemo(() => {
    const {
      firstName,
      lastName,
      email,
      dob,
      city,
      state,
      postalCode,
      address,
      bankAccount,
      bankRouting,
    } = updatedData;
    return !(
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      dob !== '' &&
      city !== '' &&
      state !== '' &&
      postalCode !== '' &&
      address !== '' &&
      bankAccount !== '' &&
      bankRouting !== '' &&
      ((firstName && paymentMethod?.firstName !== firstName) ||
        (lastName && paymentMethod?.lastName !== lastName) ||
        (email && paymentMethod?.email !== email) ||
        (dob && paymentMethod?.dob !== dob) ||
        (city && paymentMethod?.city !== city) ||
        (state && paymentMethod?.state !== state) ||
        (postalCode && paymentMethod?.postalCode !== postalCode) ||
        (address && paymentMethod?.address !== address) ||
        (bankAccount && paymentMethod?.bankAccount !== bankAccount) ||
        (bankRouting && paymentMethod?.bankRouting !== bankRouting))
    );
  }, [
    updatedData,
    paymentMethod?.firstName,
    paymentMethod?.lastName,
    paymentMethod?.email,
    paymentMethod?.dob,
    paymentMethod?.city,
    paymentMethod?.state,
    paymentMethod?.postalCode,
    paymentMethod?.address,
    paymentMethod?.bankAccount,
    paymentMethod?.bankRouting,
  ]);

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <Wrapper>
      <Row>
        <Col>
          <Row justify='center' gutter={[22, 6]}>
            <Col span={24} padding_bottom={20}>
              <Title block level={1}>
                Payment Method
              </Title>
            </Col>
            <Col span={12}>
              <Text level={3}>First name*</Text>
            </Col>
            <Col span={12}>
              <Text level={3}>Last Name*</Text>
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='firstName'
                control={control}
                defaultValue={paymentMethod?.firstName}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='lastName'
                control={control}
                defaultValue={paymentMethod?.lastName}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12}>
              <Text level={3}>Email*</Text>
            </Col>
            <Col span={12}>
              <Text level={3}>Address*</Text>
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='email'
                control={control}
                defaultValue={paymentMethod?.email}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='address'
                control={control}
                defaultValue={paymentMethod?.address}
                render={({ field }) => <Input {...field} maxLength={100} />}
              />
            </Col>
            <Col span={12}>
              <Text level={3}>City*</Text>
            </Col>
            <Col span={12}>
              <Text level={3}>Postal Code*</Text>
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='city'
                control={control}
                defaultValue={paymentMethod?.city}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='postalCode'
                control={control}
                defaultValue={paymentMethod?.postalCode}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12}>
              <Text level={3}>Date of Birth*</Text>
            </Col>
            <Col span={12}>
              <Text level={3}>State*</Text>
            </Col>
            <Col span={12} padding_bottom={12}>
              <Controller
                name='dob'
                control={control}
                defaultValue={paymentMethod?.dob}
                render={({ field }) => <DatePicker {...field} />}
              />
            </Col>
            <Col span={12}>
              <Controller
                name='state'
                control={control}
                defaultValue={paymentMethod?.state}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[22, 8]}>
            <Col span={24} padding_top={40}>
              <Title level={1}>Add Card</Title>
            </Col>
            <Col span={12}>
              <Text level={3}>Bank Account Number*</Text>
            </Col>
            <Col span={12}>
              <Text level={3}>Bank Routing Number*</Text>
            </Col>
            <Col span={12}>
              <Controller
                name='bankAccount'
                control={control}
                defaultValue={paymentMethod?.bankAccount}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
            <Col span={12}>
              <Controller
                name='bankRouting'
                control={control}
                defaultValue={paymentMethod?.bankRouting}
                render={({ field }) => <Input {...field} maxLength={50} />}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} padding_top={100} padding_bottom={20}>
          <Footer
            disabled={disabled}
            updatedData={updatedData}
            onCancel={goExplorePage}
            closeModal={hideModal}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
      {confirmationVisible && (
        <Confirmation
          visible={confirmationVisible}
          title='Do you still want to close the changes?'
          onConfirm={hideModal}
          onCancel={hideConfirmation}
        />
      )}
    </Wrapper>
  );
};

export default memo(Payment);
