import React from 'react';

class Cards extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log('extra Info: ', this.props.extraInfo);


    var mordredTeam = this.props.extraInfo.mordredTeam;
    var merlinTeam = this.props.extraInfo.merlinTeam;
    /*
    Example for Morgana:
    {
      mordredTeam:{mordred:['3','10'], minionofmordred:['3','10'], morgana:['yourself'], oberon:['unknown']}
      merlinTeam:{merlin:['unknown'], loyalservant_1:['unknown'], loyalservant_2:['unknown'], , loyalservant_3:['unknown'], percival:['unknown']}
    }
    */

    // loop on each key and bluid table row

    var bad = {
      //'mordred':'Mordred',
      //'minionofmordred':'Minion of Mordred',
      'morgana':'Morgana',
      'oberon':'Oberon'
    };

    var good = {
      //'merlin':'Merlin',
      //'loyalservant_1':'Loyal Servant',
      'percival':'Percival',
      'loyalservant_2':'Loyal Servant',
      'loyalservant_3':'Loyal Servant',
      'loyalservant_4':'Loyal Servant'
    };

    var arr = [[],[]];
    var table = [];
    //var table2;

    for (var key in merlinTeam){
      if (key !== 'merlin' && key !== 'loyalservant_1'){
        arr[1].push([key, good[key] + ' is ' + merlinTeam[key].join(' or ')]);
      }
    };

    for (var key in mordredTeam){
      if (key !== 'mordred' && key !== 'minionofmordred'){
        arr[0].push([key, bad[key] + ' is ' + mordredTeam[key].join(' or ')]);
      }
    };


    for(var i = 0; i < arr[1].length; i++){

      let image1 = arr[0][i]?`url(/styles/Resources/${arr[0][i][0]}.png)`:'';
      let image2 = arr[1][i]?`url(/styles/Resources/${arr[1][i][0]}.png)`:'';
      let name1 = arr[0][i]?arr[0][i][1]:'';
      let name2 = arr[1][i]?arr[1][i][1]:'';

      let a = <tr>
                  <td><div className="photosRules" style={{content: image1}} ></div></td>
                  <td><div className="photosRules" style={{content: image2}} ></div></td>
                </tr>;

      let b = <tr>
                  <td style={{fontSize:'35px'}}>{name1}</td>
                  <td style={{fontSize:'35px'}}>{name2}</td>
                </tr>;


      table.push(a);

      table.push(b);


    }

    // table.push(<tr>
    //             <td></td>
    //             <td><div className="photosRules" style={{content: `url(/styles/Resources/${arr[1][0][0]}.png)`}} ></div></td>
    //           </tr>);

    // table.push(<tr>
    //             <td style={{fontSize:'35px'}}></td>
    //             <td style={{fontSize:'35px'}}>{arr[1][0][1]}</td>
    //           </tr>);


    return (
  <div className="table-responsive">
      <table className="table">
        <tbody>
            <th>Mordred Team</th>
            <th>Merlin Team</th>
          <tr>
            <th>Sabotage 3 missions to win</th>
            <th>Succeed 3 missions to win</th>
          </tr>
          <tr>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/mordred.png)`, 'order-top': 'none !important'}} ></div></td>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/merlin.png)`}} ></div></td>
          </tr>
          <tr>
            <td>Mordred is {mordredTeam.mordred.join(' or ')}</td>
            <td>Merlin is {merlinTeam.merlin.join(' or ')}</td>
          </tr>

          <tr>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/minionofmordred.png)`, 'order-top': 'none !important'}} ></div></td>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/loyalservant.png)`}} ></div></td>
          </tr>
          <tr>
            <td>Minion of Mordred is {mordredTeam.minionofmordred.join(' or ')}</td>
            <td>Loyal Servant is {merlinTeam.loyalservant_1.join(' or ')}</td>
          </tr>


          {table.map(element => element)}




        </tbody>
      </table>
    </div>
    )}
}

export default Cards;
