import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Угадай число от 1 до 10',
    userNumber: '',
    randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
    count: 0,
    button: 'Угадать',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
      button: 'Угадать',
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
      return {
        result: `Вы угадали! Загаданное число ${state.userNumber}, число попыток ${state.count}`,
        button: 'Сыграть еще',
        userNumber: '',
        randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
        count: 0,
      };
    });

    this.setState({
      userNumber: '',
    });

    console.log(this.state);
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />
          <button className={style.btn}>{this.state.button}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
