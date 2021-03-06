import React from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const Header = ({
  switchGame,
  returnGroup,
}) => (
  <Form className="speakit__header">
    <Form.Item label="Уровень сложности">
      <Select
        defaultValue="Первый"
        className="speakit__start-screen_level-dropdown"
        style={{ width: 100 }}
        onChange={(value) => {
          const level = value.split(',');
          switchGame({ group: parseInt(level[0], 10), page: parseInt(level[1], 10) });
          returnGroup(parseInt(level[0], 10));
        }}
      >
        <Select.Option value="0,1">Первый</Select.Option>
        <Select.Option value="1,0">Второй</Select.Option>
        <Select.Option value="2,0">Третий</Select.Option>
        <Select.Option value="3,0">Четвертый</Select.Option>
        <Select.Option value="4,0">Пятый</Select.Option>
        <Select.Option value="5,0">Шестой</Select.Option>
      </Select>
    </Form.Item>
  </Form>
);

Header.propTypes = {
  switchGame: PropTypes.func.isRequired,
  returnGroup: PropTypes.func.isRequired,
};

export default Header;
