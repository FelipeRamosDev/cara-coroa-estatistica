var results = {
    wins: [],
    looses: []
};

function throwCoin(choosedFace){
    let upFace = parseInt(Math.random() * 2);
    let finalResult = '';
    let parsedResult = upFace == 0 ? 'Coroa' : 'Cara';
    
    if(choosedFace == upFace){
        finalResult = true;
    } else {
        finalResult = false;
    }

    return {
        upFace,
        finalResult,
        parsedResult
    }
}

async function play(choosedFace){
    return new Promise((resolve,reject)=>{

        let table = document.querySelector('#result');
        let tbody = table.querySelector('tbody');
        let newLine = document.createElement('tr');
        let result = throwCoin(choosedFace);
        let winsPercentage, loosePercentage, winsTotal, looseTotal;
        let hitsNode = document.querySelector('.wrap-result .result.hits');
        let mistakesNode = document.querySelector('.wrap-result .result.mistakes');
    
    
        newLine.innerHTML += `
            <td>${tbody.querySelectorAll('tr').length +1}</td>
            <td>${result.finalResult ? 'Ganhou' : 'Perdeu'}</td>
            <td>${(choosedFace == 0) ? 'Coroa' : 'Cara'}</td>
            <td>${result.parsedResult}</td>
        `;
    
        tbody.prepend(newLine);
        
        if(result.finalResult){
            results.wins.push(result);
            newLine.classList.add('win');
        } else {
            results.looses.push(result);
            newLine.classList.add('loose');
        }
    
        winsTotal = results.wins.length;
        looseTotal = results.looses.length;
        winsPercentage = (winsTotal * 100) / (winsTotal + looseTotal);
        loosePercentage = (looseTotal * 100) / (winsTotal + looseTotal);
    
        hitsNode.innerHTML = `
            <h2>${winsPercentage.toFixed(0)}%</h2>
            <p><span>${winsTotal}</span> acertos</p>
        `;
        mistakesNode.innerHTML = `
            <h2>${loosePercentage.toFixed(0)}%</h2>
            <p><span>${looseTotal}</span> erros</p>
        `;
    
        setTimeout(()=>{
            resolve();
        }, 1);
    });
}

async function autoPlay(ev){
    ev.preventDefault();
    let input = ev.target.querySelector('input');

    for(let i = 0; i < input.value; i++){
        let choosedFace = parseInt(Math.random() * 2);

        await play(choosedFace);
    }

}

function reset(){
    let resultNodes = document.querySelectorAll('.wrap-result .result');
    let tbody = document.querySelector('#result tbody');
    tbody.innerHTML = '';

    resultNodes.forEach(node=>{
        node.innerHTML = `
            <h2>--%</h2>
            <p><span>--</span></p>
        `;
    });

    results = {
        wins: [],
        looses: []
    }
}