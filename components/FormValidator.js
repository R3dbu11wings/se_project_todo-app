class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings._inputSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formEl = formEl;
    this._buttonElement = this._formEl.querySelector(
      settings.submitButtonSelector
    );
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      console.log("heavyfart");
    } else {
      this._hideInputError(inputElement);
    }
  }

  _resetValidation = () => {
    if (!this._inputList) {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
      console.log("reset");
    }

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

  _hasInvalidInput() {
    if (!this._inputList) {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
    }
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    this._toggleButtonState();
    this._setEventListeners();
  }
}

export default FormValidator;
