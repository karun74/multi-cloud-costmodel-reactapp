import React from 'react';


const Results = (props) => {
  const { priceDetail } = props;
  return (
    <div>
    <table>
						
						<tr>
							<th> Running Cost per Application per month $</th>
							<td>
							
								{priceDetail}
							</td>

						</tr>

					</table>
  </div>
  );
}

export default Results;