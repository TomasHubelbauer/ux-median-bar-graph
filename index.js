window.addEventListener('load', () => {
  render(
    [
      { runtime: 60, result: 'success' },
      { runtime: 70, result: 'success' },
      { runtime: 50, result: 'success' },
      { runtime: 60, result: 'success' },
      { runtime: 350, result: 'error' },
      { runtime: 30, result: 'error' },
      { runtime: 10, result: 'progress' },
    ],
    1.5
  );
});

function render(/** @type {Number[]} */ values, /** @type {Number} */ factor = undefined) {
  // https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
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

  document.body.append(medianBarGraphDiv);
}
