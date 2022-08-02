// 食材削除ページ
function Delete() {
  return (
      <div className='delete'>
          <h1>削除ページ</h1>
          <nav>
            <p>消費期限</p>
            <p>食材種類</p>
            <p>保存場所</p>
          </nav>
          <table>
            <thead>
            <tr>
                <th >食材名</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
            </tr>

            <tr>
              <td>
                <input type="checkbox"/>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
            </tr>

            </tbody>
          </table>
          <form>
            <button>期限切れ削除</button>
            <button>選択したものを削除</button>
          </form>
      </div>
  );
}

export default Delete;
