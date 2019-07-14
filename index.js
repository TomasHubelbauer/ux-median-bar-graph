window.addEventListener('load', () => {
  let factor = 1.5;
  const values = new Array(10).fill(null).map(() => ({ runtime: Math.round(Math.random() * 1000), result: ['success', 'error', 'progress'][Math.floor(Math.random() * 3)] }));

  const graphDiv = document.getElementById('graphDiv');
  const animated = render(values, factor);
  animated.classList.add('animated');
  graphDiv.append(animated);

  const factorInput = document.getElementById('factorInput');
  factorInput.addEventListener('input', () => {
    factor = event.currentTarget.valueAsNumber;
    graphDiv.innerHTML = '';
    graphDiv.append(render(values, factor));
  });

  const addValueButton = document.getElementById('addValueButton');
  addValueButton.addEventListener('click', handleAddValueButtonClick);

  const valuesTbody = document.getElementById('valuesTbody');
  function refresh() {
    valuesTbody.innerHTML = '';

    let index = 0;
    for (const value of values) {
      const valueTr = document.createElement('tr');

      const valueTd = document.createElement('td');

      const valueInput = document.createElement('input');
      valueInput.dataset.index = index;
      valueInput.type = 'number';
      valueInput.value = value.runtime;
      valueInput.min = 0;
      valueInput.addEventListener('input', handleValueInputInput);

      valueTd.append(valueInput);
      valueTr.append(valueTd);

      const stateTd = document.createElement('td');

      const stateSelect = document.createElement('select');
      stateSelect.dataset.index = index;
      stateSelect.addEventListener('change', handleStateSelectChange);

      const successOption = document.createElement('option');
      successOption.textContent = 'success';
      successOption.selected = value.result === 'success';

      const errorOption = document.createElement('option');
      errorOption.textContent = 'error';
      errorOption.selected = value.result === 'error';

      const progressOption = document.createElement('option');
      progressOption.textContent = 'progress';
      progressOption.selected = value.result === 'progress';

      stateSelect.append(successOption, errorOption, progressOption);
      stateTd.append(stateSelect);
      valueTr.append(stateTd);

      const buttonTd = document.createElement('td');

      const deleteValueButton = document.createElement('button');
      deleteValueButton.textContent = '-';
      deleteValueButton.dataset.index = index;
      deleteValueButton.addEventListener('click', handleDeleteValueButtonClick);
      buttonTd.append(deleteValueButton);
      valueTr.append(buttonTd);

      valuesTbody.append(valueTr);
      index++;
    }
  }

  refresh();

  function handleAddValueButtonClick() {
    values.push({ runtime: 0, result: 'success' });
    graphDiv.innerHTML = '';
    graphDiv.append(render(values, factor));
    refresh();
    document.querySelector('tbody tr:last-child input').focus();
  }

  function handleValueInputInput(event) {
    const index = Number(event.currentTarget.dataset.index);
    values[index].runtime = event.currentTarget.value;
    graphDiv.innerHTML = '';
    graphDiv.append(render(values, factor));
  }

  function handleStateSelectChange(event) {
    const index = Number(event.currentTarget.dataset.index);
    values[index].result = event.currentTarget.value;
    graphDiv.innerHTML = '';
    graphDiv.append(render(values, factor));
  }

  function handleDeleteValueButtonClick(event) {
    const index = Number(event.currentTarget.dataset.index);
    values.splice(index, 1);
    graphDiv.innerHTML = '';
    graphDiv.append(render(values, factor));
    refresh();
  }
});

function render(/** @type {Number[]} */ values, /** @type {Number} */ factor = undefined) {
  const numbers = values.map(v => v.runtime).sort();
  const median = numbers.length % 2 === 0
    // Average of two middle numbers
    ? (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2
    // Take the middle number only
    : numbers[(numbers.length - 1) / 2]
    ;

  const threshold = median * (factor || 1);

  const medianBarGraphDiv = document.createElement('div');
  medianBarGraphDiv.className = 'MedianBarGraph';

  for (let index = 0; index < values.length; index++) {
    const value = values[index];

    const mediaBarGraphBarBoxDiv = document.createElement('div');
    mediaBarGraphBarBoxDiv.className = 'MedianBarGraph-barBox';
    medianBarGraphDiv.append(mediaBarGraphBarBoxDiv);

    const factor = value.runtime > threshold ? `×${(value.runtime / threshold).toFixed(1)}` : '\u00A0' /* &nbsp; */;

    const medianBarGraphFactorSpan = document.createElement('span');
    medianBarGraphFactorSpan.className = 'MedianBarGraph-factor';
    medianBarGraphFactorSpan.textContent = factor;
    mediaBarGraphBarBoxDiv.append(medianBarGraphFactorSpan);

    const medianBarGraphBarAreaDiv = document.createElement('div');
    medianBarGraphBarAreaDiv.className = 'MedianBarGraph-barArea';
    mediaBarGraphBarBoxDiv.append(medianBarGraphBarAreaDiv);

    let className = 'MedianBarGraph-bar';
    switch (value.result) {
      case 'success': className += ' MedianBarGraph-barSuccess'; break;
      case 'error': className += ' MedianBarGraph-barError'; break;
      case 'progress': className += ' MedianBarGraph-barProgress'; break;
      default: break;
    }

    const percent = `${((value.runtime > threshold ? threshold : value.runtime) / threshold) * 100}%`;

    const mediaBarGraphBarDiv = document.createElement('div');
    mediaBarGraphBarDiv.className = className;
    mediaBarGraphBarDiv.style.height = percent;
    mediaBarGraphBarDiv.textContent = value.runtime;
    medianBarGraphBarAreaDiv.append(mediaBarGraphBarDiv);
  }

  return medianBarGraphDiv;
}
