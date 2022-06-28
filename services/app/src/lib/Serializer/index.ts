import Exception from "@lib/Exception";

/**
 * レスポンス生成用クラス
 */
class Serializer {
  /**
   * エラー時のレスポンス
   * @param error 例外クラス
   * @returns
   */
  error(error: Exception) {
    return {
      message: error.message,
    };
  }
}

export default Serializer;
